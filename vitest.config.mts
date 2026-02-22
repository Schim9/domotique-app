import { defineConfig } from 'vitest/config';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';

/**
 * Minimal Vite plugin that inlines Angular templateUrl/styleUrls so the
 * JIT compiler can compile components in the jsdom test environment
 * without needing the @analogjs Vite plugin (which requires Vite 6+,
 * incompatible with Angular 16's bundled Vite 4).
 */
function angularInlineTemplates() {
  return {
    name: 'angular-inline-templates',
    transform(code: string, id: string) {
      if (!id.endsWith('.ts') || id.endsWith('.d.ts')) return;
      if (!code.includes('templateUrl') && !code.includes('styleUrls')) return;

      let result = code;

      result = result.replace(
        /templateUrl:\s*['"`](.+?)['"`]/g,
        (_match: string, templatePath: string) => {
          const fullPath = resolve(dirname(id), templatePath);
          try {
            return `template: ${JSON.stringify(readFileSync(fullPath, 'utf-8'))}`;
          } catch {
            return _match;
          }
        }
      );

      result = result.replace(
        /styleUrls:\s*\[([^\]]*)\]/g,
        (_match: string, urlList: string) => {
          const urls = [...urlList.matchAll(/['"`](.+?)['"`]/g)].map(m => m[1]);
          const styles = urls.map((p: string) => {
            try {
              return JSON.stringify(readFileSync(resolve(dirname(id), p), 'utf-8'));
            } catch {
              return '""';
            }
          });
          return `styles: [${styles.join(', ')}]`;
        }
      );

      return result;
    },
  };
}

export default defineConfig({
  plugins: [angularInlineTemplates()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    reporters: ['default'],
  },
});
