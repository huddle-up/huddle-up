module.exports = {
  client: {
    service: {
      localSchemaFile: '../api/src/schema.gql',
    },
  },
};

// -- apollo cli interface generation --
// apollo client:codegen --target typescript __generated-interfaces__
