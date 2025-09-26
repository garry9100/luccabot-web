#!/usr/bin/env python3
"""
Luccabot Static Site Server for Render
Simple HTTP server with security headers and PWA support
"""

import http.server
import socketserver
import os
import sys
from urllib.parse import urlparse

class LuccabotHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom request handler with security headers and PWA support"""
    
    def end_headers(self):
        # Add security headers
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        
        # Add PWA headers
        if self.path.endswith('.json') and 'manifest' in self.path:
            self.send_header('Content-Type', 'application/manifest+json')
        
        # Add caching headers
        if self.path.endswith(('.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2')):
            self.send_header('Cache-Control', 'public, max-age=2592000')  # 30 days
        elif self.path.endswith(('.html', '.htm')):
            self.send_header('Cache-Control', 'public, max-age=3600')  # 1 hour
        
        # Add CORS headers for fonts
        if self.path.endswith(('.woff', '.woff2', '.ttf', '.otf')):
            self.send_header('Access-Control-Allow-Origin', '*')
        
        super().end_headers()
    
    def do_GET(self):
        # Handle root path
        if self.path == '/':
            self.path = '/index.html'
        
        # Handle SPA routing - serve index.html for unknown routes
        if not os.path.exists('.' + self.path) and not self.path.startswith('/static'):
            self.path = '/index.html'
        
        return super().do_GET()
    
    def log_message(self, format, *args):
        """Custom log format"""
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")

def main():
    """Main server function"""
    port = int(os.environ.get('PORT', 8000))
    
    print(f"Starting Luccabot server on port {port}")
    print(f"Serving files from: {os.getcwd()}")
    
    with socketserver.TCPServer(("", port), LuccabotHTTPRequestHandler) as httpd:
        print(f"Server running at http://localhost:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")
            httpd.shutdown()

if __name__ == "__main__":
    main()
