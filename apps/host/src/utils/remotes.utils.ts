// This file would typically fetch a manifest from your API/CDN
// In a real scenario, you'd fetch from a known endpoint like /mf-manifest.json
interface RemoteDefinition {
    name: string;
    entry: string; // The full URL to the remoteEntry.js
}

type Remotes = Array<string | [remoteName: string, remoteUrl: string]>;

// This function could fetch from a backend API, a JSON file on CDN, etc.
export async function getRemoteUrls(): Promise<Array<string | [remoteName: string, remoteUrl: string]>> {
    // Example: Fetching from a static JSON manifest
    const manifestUrl = process.env.NODE_ENV === 'local'
        ? '/assets/mf-remote-manifest.local.json' // Deploy this manifest to your CDN
        : '/assets/mf-remote-manifest.prod.json'; // Or wherever your dev server serves it
    try {
        const response = await fetch(manifestUrl);
        if (!response.ok) {
            throw new Error(`Failed to load remote manifest: ${response.statusText}`);
        }
        const data: RemoteDefinition[] = await response.json();
        const remotes: Array<string | [remoteName: string, remoteUrl: string]> = [];
        data.forEach((remote, index) => {
            remotes[index] = [remote.name, remote.entry];
        });
        return remotes;
    } catch (error) {
        console.error('Error fetching remote definitions:', error);
        // Fallback to static remotes or handle gracefully
        /** For Local */
        /*return [
            ['shop', 'http://localhost:4201/remoteEntry.js'],
            ['cart', 'http://localhost:4202/remoteEntry.js'],
            ['about', 'http://localhost:4203/remoteEntry.js'],
        ]*/
        return [
            // Fallback for dev
            ['shop', 'shop@/react-module-federation-webpack/shop/remoteEntry.js'],
            ['cart', 'cart@/react-module-federation-webpack/cart/remoteEntry.js'],
            ['about', 'about@/react-module-federation-webpack/about/remoteEntry.js'],
            // For production, you might have a hardcoded fallback or fail
            // 'remote-app': 'https://your-domain.com/remote-app-fallback/remoteEntry.js',
        ];
    }
}
