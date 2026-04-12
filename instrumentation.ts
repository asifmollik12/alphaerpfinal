// This file runs before Next.js initializes
export function register() {
  if (typeof window === 'undefined') {
    // Polyfill localStorage for server-side
    class LocalStorageMock implements Storage {
      private store = new Map<string, string>();
      
      getItem(key: string): string | null {
        return this.store.get(key) || null;
      }
      
      setItem(key: string, value: string): void {
        this.store.set(key, String(value));
      }
      
      removeItem(key: string): void {
        this.store.delete(key);
      }
      
      clear(): void {
        this.store.clear();
      }
      
      get length(): number {
        return this.store.size;
      }
      
      key(index: number): string | null {
        const keys = Array.from(this.store.keys());
        return keys[index] || null;
      }
    }

    // Set localStorage on global
    Object.defineProperty(global, 'localStorage', {
      value: new LocalStorageMock(),
      writable: false,
      configurable: false,
    });
  }
}
