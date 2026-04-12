import type {NextConfig} from 'next';

// Polyfill localStorage for server-side
if (typeof window === 'undefined' && typeof global.localStorage === 'undefined') {
  class LocalStorageMock {
    private store = new Map<string, string>();
    getItem(key: string) { return this.store.get(key) || null; }
    setItem(key: string, value: string) { this.store.set(key, value); }
    removeItem(key: string) { this.store.delete(key); }
    clear() { this.store.clear(); }
    get length() { return this.store.size; }
    key(index: number) { return Array.from(this.store.keys())[index] || null; }
  }
  (global as any).localStorage = new LocalStorageMock();
}

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
