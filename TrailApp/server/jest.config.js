// jest.config.js
export default {
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    },
    extensionsToTreatAsEsm: [".ts", ".tsx"], // Removed .js
    testEnvironment: 'node'
};