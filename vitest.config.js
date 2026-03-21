import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        include: ['tests/unit/**/*.test.js'],
        globals: true,
        onConsoleLog: (log) => { process.stdout.write(log + '\n'); },
    },
});
