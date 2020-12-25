export const nodeVersion = process.versions.node
export const nodeVersionMajor = nodeVersion.slice(0, 2)
export const runtimeVersion = `${nodeVersion}, V8 ${process.versions.v8}`
