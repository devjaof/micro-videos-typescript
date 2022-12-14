export default {
  displayName: {
    name: 'nestjs',
    color: 'yellow'
  },

  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "@swc/jest"
  },
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    '@jfr/micro\\-videos/(.*)$': '<rootDir>/../../../node_modules/@jfr/micro-videos/dist/$1'
  }
}
