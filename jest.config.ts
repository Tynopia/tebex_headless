import type { Config } from 'jest';

const config: Config = {
    testTimeout: 60000,
    setupFilesAfterEnv: [
        "./jest.setup.ts"
    ]
}

export default config;