module.exports = {
  client: {
    service: {
      localSchemaFile: '../api/src/schema.gql',
    },
  },
};

// -- apollo cli interface generation --
// apollo client:codegen --target typescript __generated-interfaces__  --globalTypesFile=./src/models/__generated-interfaces__/globalTypes.ts
