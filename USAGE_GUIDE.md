# Usage Guide - QR Code Generator

## Quick Start

1. **Start the application:**
   ```bash
   cd qr-logo-generator
   npm run dev
   ```

2. **Open your browser:**
   - Navigate to http://localhost:3000

3. **Generate your QR code:**
   - Enter a URL (e.g., https://yourdomain.com)
   - Click "Choose File" and select your logo
   - Click "Generate QR Code"
   - Click "Download QR Code" to save

## Example Workflow

### Step 1: Enter URL
```
Input: https://bluebrew.cafe
```

### Step 2: Upload Logo
- Supported formats: PNG, JPG, GIF, WebP, SVG
- Recommended: Square logos (1:1 aspect ratio)
- Recommended size: 200x200px or larger
- Transparent backgrounds work best

### Step 3: Generate
- QR code generates instantly
- Logo automatically centered
- White circular background added
- Result: 500x500px PNG

### Step 4: Download
- Click "Download QR Code"
- File saved as: `qr-code-with-logo.png`
- Ready to use in print or digital media

## Best Practices

### Logo Design
✅ **DO:**
- Use high-resolution logos (200px+)
- Keep logos simple and recognizable
- Use transparent backgrounds
- Test QR code scannability after generation

❌ **DON'T:**
- Use logos smaller than 50x50px
- Use highly detailed logos (may not be visible)
- Use very light colors (may not show on white background)

### URL Guidelines
✅ **DO:**
- Use HTTPS URLs for security
- Keep URLs under 200 characters
- Test URLs before generating QR codes

❌ **DON'T:**
- Use broken or temporary URLs
- Include sensitive information in URLs

### Testing Your QR Code
1. Scan with multiple devices (iOS, Android)
2. Test at different distances (near, far)
3. Test in different lighting conditions
4. Verify URL redirects correctly

## Troubleshooting

### QR Code Not Scanning
- Logo may be too large → Try a simpler logo design
- Check phone camera has QR scanning enabled
- Ensure proper lighting when scanning
- Print at sufficient size (minimum 2cm x 2cm)

### Logo Appears Pixelated
- Upload higher resolution logo
- Ensure logo file isn't corrupt
- Try PNG format instead of JPG

### Generate Button Disabled
- Make sure URL is entered
- Make sure logo is uploaded
- Check browser console for errors

## Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel deploy
```

### Deploy to Netlify
```bash
npm run build
# Upload .next folder to Netlify
```

### Environment Requirements
- Node.js 18+ (recommended: 23+)
- Modern browser with Canvas API
- 100MB disk space
- No database required

## API Usage (Future Enhancement)

The application currently runs client-side only. For server-side generation, you could create an API route:

```typescript
// app/api/generate/route.ts (future)
import QRCode from 'qrcode';

export async function POST(request: Request) {
  const { url, logo } = await request.json();
  // Generate QR code
  // Return PNG buffer
}
```

## Support & Feedback

For issues or feature requests:
1. Check VERIFICATION.md for known issues
2. Review troubleshooting section
3. Check browser console for errors
4. Ensure all dependencies are installed

## License & Attribution

This project uses:
- Next.js (MIT License)
- qrcode package (MIT License)
- Tailwind CSS (MIT License)

Free to use for personal and commercial projects.

