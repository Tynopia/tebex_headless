import type { Config } from 'jest';

const config: Config = {
    testTimeout: 30000,
    setupFilesAfterEnv: [
        "./jest.setup.ts"
    ]
}

export default config;