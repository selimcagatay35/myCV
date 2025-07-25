#!/usr/bin/env python3
"""
Simple HTTP server for local development with proper cache headers
Usage: python server.py [port]
Default port: 8000
"""

import http.server
import socketserver
import sys
import os

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP request handler that disables caching for development"""
    
    def end_headers(self):
        # Add cache-busting headers
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def guess_type(self, path):
        """Override to set proper MIME types"""
        mimetype, encoding = super().guess_type(path)
        
        # Ensure proper MIME types for web files
        if path.endswith('.css'):
            mimetype = 'text/css'
        elif path.endswith('.js'):
            mimetype = 'application/javascript'
        elif path.endswith('.html'):
            mimetype = 'text/html'
            
        return mimetype, encoding

def main():
    # Get port from command line or use default
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    
    # Change to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Create server
    with socketserver.TCPServer(("", port), NoCacheHTTPRequestHandler) as httpd:
        print(f"🚀 Development server running at http://localhost:{port}")
        print(f"📂 Serving files from: {os.getcwd()}")
        print(f"🔄 Cache-busting enabled - you'll always see the latest changes")
        print(f"⏹️  Press Ctrl+C to stop the server")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"\n✅ Server stopped")

if __name__ == "__main__":
    main()