'use client';

import { useState, useRef } from 'react';
import QRCode from 'qrcode';

export default function Home() {
  const [url, setUrl] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateQRCode = async () => {
    if (!url || !logo) {
      alert('Please enter a URL and upload a logo');
      return;
    }

    setIsGenerating(true);

    try {
      // Generate QR code with high error correction to accommodate the logo
      const qrCanvas = document.createElement('canvas');
      await QRCode.toCanvas(qrCanvas, url, {
        errorCorrectionLevel: 'H',
        width: 500,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });

      // Create final canvas
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = 500;
      canvas.height = 500;

      // Draw QR code
      ctx.drawImage(qrCanvas, 0, 0);

      // Load and draw logo
      const logoImg = new Image();
      logoImg.onload = () => {
        // Calculate logo size (about 20% of QR code size for better balance)
        const logoSize = canvas.width * 0.2;
        const logoX = (canvas.width - logoSize) / 2;
        const logoY = (canvas.height - logoSize) / 2;

        // Create a white background circle for the logo
        const padding = 8;
        const circleRadius = logoSize / 2 + padding;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          circleRadius,
          0,
          2 * Math.PI
        );
        ctx.fill();

        // Draw logo
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL('image/png');
        setQrCode(dataUrl);
        setIsGenerating(false);
      };
      logoImg.src = logo;
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Failed to generate QR code');
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qr-code-with-logo.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-900 dark:text-white">
            QR Code Generator
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Create custom QR codes with your logo
          </p>

          <div className="space-y-6">
            {/* URL Input */}
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Enter URL
              </label>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Logo Upload */}
            <div>
              <label
                htmlFor="logo"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Upload Logo
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="logo"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Choose File
                </button>
                {logo && (
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo}
                      alt="Logo preview"
                      className="w-12 h-12 object-contain rounded border border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Logo uploaded
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateQRCode}
              disabled={!url || !logo || isGenerating}
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? 'Generating...' : 'Generate QR Code'}
            </button>

            {/* QR Code Display */}
            {qrCode && (
              <div className="mt-8 space-y-4">
                <div className="flex justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrCode}
                      alt="Generated QR Code"
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
                <button
                  onClick={downloadQRCode}
                  className="w-full px-6 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Download QR Code
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hidden canvas for QR generation */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
