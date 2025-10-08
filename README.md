# QR Code Generator with Logo

A simple, elegant web application that generates QR codes with custom logos embedded in the center. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🎨 Clean and modern UI with responsive design
- 🔗 Generate QR codes from any URL
- 🖼️ Upload and embed custom logos in the center
- 📥 Download generated QR codes as PNG files
- 🌙 Dark mode support
- ✅ High error correction for reliable scanning

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **QR Generation:** qrcode (v1.5.4)
- **Runtime:** Node.js 23.x

## Installation

1. Navigate to the project directory:
   ```bash
   cd qr-logo-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## How to Use the App

1. **Enter URL**: Input the destination URL you want the QR code to link to
2. **Upload Logo**: Click "Choose File" to upload your logo image (PNG, JPG, etc.)
3. **Generate**: Click "Generate QR Code" to create your custom QR code
4. **Download**: Once generated, click "Download QR Code" to save the PNG file

## Technical Details

### QR Code Generation

- **Error Correction Level**: High (H) - allows up to 30% of the QR code to be obscured
- **QR Code Size**: 500x500 pixels
- **Logo Size**: 20% of QR code dimensions (100x100 pixels)
- **Logo Background**: White circular background with 8px padding for better contrast

### File Structure

```
qr-logo-generator/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main QR generator component
│   └── globals.css      # Global styles
├── package.json
└── README.md
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available for personal and commercial use.

## Sources

### Primary Documentation
- **qrcode npm package** (v1.5.4): [npmjs.com/package/qrcode](https://www.npmjs.com/package/qrcode)
  - Error correction levels and canvas API usage
  - Retrieved: October 8, 2025
  
- **Next.js 15 Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
  - App Router, TypeScript configuration, and client components
  - Retrieved: October 8, 2025

- **Canvas API MDN**: [developer.mozilla.org/en-US/docs/Web/API/Canvas_API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
  - Image composition and drawing operations
  - Retrieved: October 8, 2025

### Implementation Guidelines
- QR code error correction allows logos to cover ~20-25% of the code area
- High error correction (Level H) chosen to maintain scannability with logo overlay
- Logo positioned with circular white background to ensure QR code integrity

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
