const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Mutation {
  "Creates a new crop comparison report."
  createCropComparison(input: CreateCropComparisonMutationInput!): CropComparison!
  "Sets/updates the number of acres being compared."
  cropComparisonAcres(input: CropComparisonAcresMutationInput!): CropComparison!
  "Sets/updates core crop comparison data such as yield and price per bushel."
  cropComparisonData(input: CropComparisonDataMutationInput = {}): CropComparison!
  "Sets/updated expenses for a crop comparison."
  cropComparisonExpenses(input: CropComparisonExpensesMutationInput!): CropComparison!
}

enum CropComparisonFieldTypeEnum {
  OLEIC
  COMPARED_CROP
}

type CropComparison implements ChangedDateInterface & UserAttributionInterface @interfaceFields {
  "The internal, unqiue report report identifier."
  id: ObjectID! @project(field: "_id")
  "The farm name."
  farmName: String! @project
  "The number of acres to compare."
  acres: Float! @project
  "The high oleic field."
  oleic: CropComparisonField @project
  "The field being compared to."
  comparedTo: CropComparisonField! @project
  "The high oleic advantage per acre (profit of HO compared to the other crop)"
  advantage: Float! @project(field: "oleic", needs: ["comparedTo"])
  "The market price ratio between high oleic and the compared crop. "
  ratio: Float! @project(field: "oleic", needs: ["comparedTo"])
}

type CropComparisonField implements FarmFieldDataInterface @interfaceFields {
  "The internal, unique field comparison identifier."
  id: ObjectID! @project(field: "_id")
}

input CreateCropComparisonMutationInput {
  "The farm name."
  farmName: String!
  "The number of acres to compare."
  acres: Float!
  "The crop to compare to HO soy."
  cropToCompare: ComparisonCropTypeEnum!
  "The comparison crop's market price per bushel, in dollars."
  pricePerBushel: Float!
  "The comparison crop's yield per acre, in bushels"
  yieldPerAcre: Float!
}

input CropComparisonAcresMutationInput {
  "The comparison report to apply the acreage to."
  id: ObjectID!
  "The number of acres."
  acres: Float!
}

input CropComparisonDataMutationInput {
  "The comparison report to apply the data to."
  id: ObjectID!
  "Which field to apply the data to."
  applyTo: CropComparisonFieldTypeEnum!
  "The price per bushel, in dollars. If null, no value will be set."
  pricePerBushel: Float
  "The premium per bushel, in dollars. If null, no value will be set."
  premiumPerBushel: Float
  "The yield per acre, in bushels. If null, no value will be set."
  yieldPerAcre: Float
}

input CropComparisonExpensesMutationInput {
  "The comparison report to apply the data to."
  id: ObjectID!
  "Which field to apply the data to."
  applyTo: CropComparisonFieldTypeEnum!
  "Crop expenses to set."
  crop: [CropComparisonCropExpenseInput!] = []
  "Field operation expenses to set."
  fieldOps: [CropComparisonFieldOpsExpenseInput!] = []
  "Handling expenses to set."
  handling: [CropComparisonHandlingExpenseInput!] = []
}

input CropComparisonCropExpenseInput {
  "The crop expense category line item."
  lineItem: ExpenseCategoryCropLineItemEnum!
  "The expense in $ cost / acre."
  value: Float!
}

input CropComparisonFieldOpsExpenseInput {
  "The field ops expense category line item."
  lineItem: ExpenseCategoryFieldOpsLineItemEnum!
  "The expense in $ cost / acre."
  value: Float!
}

input CropComparisonHandlingExpenseInput {
  "The handling expense category line item."
  lineItem: ExpenseCategoryHandlingLineItemEnum!
  "The expense in $ cost / bushel."
  value: Float!
}

`;
