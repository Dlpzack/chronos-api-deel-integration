import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'deel/1.25.0 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Retrieve a list of webhook subscriptions.
   *
   * @summary List of webhooks
   * @throws FetchError<400, types.GetAllWebhooksResponse400> Operation failed.
   * @throws FetchError<401, types.GetAllWebhooksResponse401> Operation failed.
   * @throws FetchError<403, types.GetAllWebhooksResponse403> Operation failed.
   * @throws FetchError<404, types.GetAllWebhooksResponse404> Operation failed.
   * @throws FetchError<405, types.GetAllWebhooksResponse405> Operation failed.
   * @throws FetchError<429, types.GetAllWebhooksResponse429> Operation failed.
   * @throws FetchError<500, types.GetAllWebhooksResponse500> Operation failed.
   */
  getAllWebhooks(): Promise<FetchResponse<200, types.GetAllWebhooksResponse200>> {
    return this.core.fetch('/webhooks', 'get');
  }

  /**
   * Create a new webhooks subscription.
   *
   * @summary Create a webhook
   * @throws FetchError<400, types.CreateWebhookResponse400> Operation failed.
   * @throws FetchError<401, types.CreateWebhookResponse401> Operation failed.
   * @throws FetchError<403, types.CreateWebhookResponse403> Operation failed.
   * @throws FetchError<404, types.CreateWebhookResponse404> Operation failed.
   * @throws FetchError<405, types.CreateWebhookResponse405> Operation failed.
   * @throws FetchError<429, types.CreateWebhookResponse429> Operation failed.
   * @throws FetchError<500, types.CreateWebhookResponse500> Operation failed.
   */
  createWebhook(body: types.CreateWebhookBodyParam): Promise<FetchResponse<201, types.CreateWebhookResponse201>> {
    return this.core.fetch('/webhooks', 'post', body);
  }

  /**
   * Retrieve a single webhook subscription.
   *
   * @summary Retrieve a single webhook
   * @throws FetchError<400, types.WebhookControllerGetByIdResponse400> Operation failed.
   * @throws FetchError<401, types.WebhookControllerGetByIdResponse401> Operation failed.
   * @throws FetchError<403, types.WebhookControllerGetByIdResponse403> Operation failed.
   * @throws FetchError<404, types.WebhookControllerGetByIdResponse404> Operation failed.
   * @throws FetchError<405, types.WebhookControllerGetByIdResponse405> Operation failed.
   * @throws FetchError<429, types.WebhookControllerGetByIdResponse429> Operation failed.
   * @throws FetchError<500, types.WebhookControllerGetByIdResponse500> Operation failed.
   */
  webhookController_getById(metadata: types.WebhookControllerGetByIdMetadataParam): Promise<FetchResponse<200, types.WebhookControllerGetByIdResponse200>> {
    return this.core.fetch('/webhooks/{id}', 'get', metadata);
  }

  /**
   * Edit a webhook subscription.
   *
   * @summary Edit a webhook
   * @throws FetchError<400, types.WebhookControllerEditByIdResponse400> Operation failed.
   * @throws FetchError<401, types.WebhookControllerEditByIdResponse401> Operation failed.
   * @throws FetchError<403, types.WebhookControllerEditByIdResponse403> Operation failed.
   * @throws FetchError<404, types.WebhookControllerEditByIdResponse404> Operation failed.
   * @throws FetchError<405, types.WebhookControllerEditByIdResponse405> Operation failed.
   * @throws FetchError<429, types.WebhookControllerEditByIdResponse429> Operation failed.
   * @throws FetchError<500, types.WebhookControllerEditByIdResponse500> Operation failed.
   */
  webhookController_editById(body: types.WebhookControllerEditByIdBodyParam, metadata: types.WebhookControllerEditByIdMetadataParam): Promise<FetchResponse<200, types.WebhookControllerEditByIdResponse200>> {
    return this.core.fetch('/webhooks/{id}', 'patch', body, metadata);
  }

  /**
   * Delete a webhook subscription.
   *
   * @summary Delete a webhook
   * @throws FetchError<400, types.WebhookControllerDeleteByIdResponse400> Operation failed.
   * @throws FetchError<401, types.WebhookControllerDeleteByIdResponse401> Operation failed.
   * @throws FetchError<403, types.WebhookControllerDeleteByIdResponse403> Operation failed.
   * @throws FetchError<404, types.WebhookControllerDeleteByIdResponse404> Operation failed.
   * @throws FetchError<405, types.WebhookControllerDeleteByIdResponse405> Operation failed.
   * @throws FetchError<429, types.WebhookControllerDeleteByIdResponse429> Operation failed.
   * @throws FetchError<500, types.WebhookControllerDeleteByIdResponse500> Operation failed.
   */
  webhookController_deleteById(metadata: types.WebhookControllerDeleteByIdMetadataParam): Promise<FetchResponse<200, types.WebhookControllerDeleteByIdResponse200>> {
    return this.core.fetch('/webhooks/{id}', 'delete', metadata);
  }

  /**
   * Retrieve a list of webhook event types.
   *
   * @summary List of webhook event types
   * @throws FetchError<400, types.GetAllWebhookEventTypesResponse400> Operation failed.
   * @throws FetchError<401, types.GetAllWebhookEventTypesResponse401> Operation failed.
   * @throws FetchError<403, types.GetAllWebhookEventTypesResponse403> Operation failed.
   * @throws FetchError<404, types.GetAllWebhookEventTypesResponse404> Operation failed.
   * @throws FetchError<405, types.GetAllWebhookEventTypesResponse405> Operation failed.
   * @throws FetchError<429, types.GetAllWebhookEventTypesResponse429> Operation failed.
   * @throws FetchError<500, types.GetAllWebhookEventTypesResponse500> Operation failed.
   */
  getAllWebhookEventTypes(): Promise<FetchResponse<200, types.GetAllWebhookEventTypesResponse200>> {
    return this.core.fetch('/webhooks/events/types', 'get');
  }

  /**
   * Creates a consent token for the specified user, profile and contract
   *
   * @summary Create a consent token
   * @throws FetchError<400, types.CreateConsentTokenResponse400> Validation error
   * @throws FetchError<401, types.CreateConsentTokenResponse401> Operation failed.
   * @throws FetchError<403, types.CreateConsentTokenResponse403> Operation failed.
   * @throws FetchError<404, types.CreateConsentTokenResponse404> Operation failed.
   * @throws FetchError<500, types.CreateConsentTokenResponse500> Internal server error
   */
  createConsentToken(body: types.CreateConsentTokenBodyParam): Promise<FetchResponse<201, types.CreateConsentTokenResponse201>> {
    return this.core.fetch('/consent_token', 'post', body);
  }

  /**
   * Delete an existing hourly report preset.
   *  **Token scopes**: `timesheets:write`
   *
   * @summary Delete Hourly Report Preset
   * @throws FetchError<400, types.DeleteHourlyReportPresetResponse400> Bad Request
   * @throws FetchError<401, types.DeleteHourlyReportPresetResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteHourlyReportPresetResponse403> Forbidden
   * @throws FetchError<404, types.DeleteHourlyReportPresetResponse404> Not Found
   * @throws FetchError<500, types.DeleteHourlyReportPresetResponse500> Operation failed.
   */
  deleteHourlyReportPreset(metadata: types.DeleteHourlyReportPresetMetadataParam): Promise<FetchResponse<200, types.DeleteHourlyReportPresetResponse200>> {
    return this.core.fetch('/timesheets/presets/{id}', 'delete', metadata);
  }

  /**
   * Update an existing hourly report preset.
   *  **Token scopes**: `timesheets:write`
   *
   * @summary Update Hourly Report Preset
   * @throws FetchError<400, types.UpdateHourlyReportPresetResponse400> Bad Request
   * @throws FetchError<401, types.UpdateHourlyReportPresetResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateHourlyReportPresetResponse403> Forbidden
   * @throws FetchError<404, types.UpdateHourlyReportPresetResponse404> Not Found
   * @throws FetchError<500, types.UpdateHourlyReportPresetResponse500> Operation failed.
   */
  updateHourlyReportPreset(body: types.UpdateHourlyReportPresetBodyParam, metadata: types.UpdateHourlyReportPresetMetadataParam): Promise<FetchResponse<200, types.UpdateHourlyReportPresetResponse200>> {
    return this.core.fetch('/timesheets/presets/{id}', 'patch', body, metadata);
  }

  /**
   * Retrieve a specific hourly report preset by its ID.
   *  **Token scopes**: `timesheets:read`
   *
   * @summary Get Hourly Report Preset by ID
   * @throws FetchError<400, types.GetHourlyReportPresetByIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetHourlyReportPresetByIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetHourlyReportPresetByIdResponse403> Forbidden
   * @throws FetchError<404, types.GetHourlyReportPresetByIdResponse404> Not Found
   * @throws FetchError<500, types.GetHourlyReportPresetByIdResponse500> Operation failed.
   */
  getHourlyReportPresetById(metadata: types.GetHourlyReportPresetByIdMetadataParam): Promise<FetchResponse<200, types.GetHourlyReportPresetByIdResponse200>> {
    return this.core.fetch('/timesheets/presets/{id}', 'get', metadata);
  }

  /**
   * Update custom field value.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Update custom field value
   * @throws FetchError<400, types.UpsertCustomFieldValueFromContractsResponse400> Operation failed.
   * @throws FetchError<401, types.UpsertCustomFieldValueFromContractsResponse401> Operation failed.
   * @throws FetchError<403, types.UpsertCustomFieldValueFromContractsResponse403> Operation failed.
   * @throws FetchError<500, types.UpsertCustomFieldValueFromContractsResponse500> Operation failed.
   */
  upsertCustomFieldValueFromContracts(body: types.UpsertCustomFieldValueFromContractsBodyParam, metadata: types.UpsertCustomFieldValueFromContractsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/contracts/{contract_id}/custom_fields', 'put', body, metadata);
  }

  /**
   * Retrieve custom fields for a contract.
   *  **Token scopes**: `contracts:read`
   *
   * @summary Retrieve custom fields for a contract
   * @throws FetchError<400, types.GetCustomFieldValuesFromContractResponse400> Operation failed.
   * @throws FetchError<401, types.GetCustomFieldValuesFromContractResponse401> Operation failed.
   * @throws FetchError<403, types.GetCustomFieldValuesFromContractResponse403> Operation failed.
   * @throws FetchError<500, types.GetCustomFieldValuesFromContractResponse500> Operation failed.
   */
  getCustomFieldValuesFromContract(metadata: types.GetCustomFieldValuesFromContractMetadataParam): Promise<FetchResponse<200, types.GetCustomFieldValuesFromContractResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/custom_fields', 'get', metadata);
  }

  /**
   * Creates an Employee of Record (EOR) contract quote. This endpoint allows to submit
   * details for an EOR contract. Deel will process the information and return a quote for
   * the requested contract.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Create an EOR contract
   * @throws FetchError<400, types.CreateEorContractResponse400> Invalid request parameters.
   * @throws FetchError<401, types.CreateEorContractResponse401> Operation failed.
   * @throws FetchError<403, types.CreateEorContractResponse403> Operation failed.
   * @throws FetchError<404, types.CreateEorContractResponse404> Operation failed.
   * @throws FetchError<500, types.CreateEorContractResponse500> Internal server error.
   */
  createEorContract(body: types.CreateEorContractBodyParam): Promise<FetchResponse<200, types.CreateEorContractResponse200>> {
    return this.core.fetch('/eor', 'post', body);
  }

  /**
   * List time-off requests for Organization
   *  **Token scopes**: `time-off:read`
   *
   * @summary List time-off requests for Organization
   * @throws FetchError<400, types.GetTimeOffsQueryForOrganizationResponse400> Operation failed.
   * @throws FetchError<401, types.GetTimeOffsQueryForOrganizationResponse401> Operation failed.
   * @throws FetchError<403, types.GetTimeOffsQueryForOrganizationResponse403> Operation failed.
   * @throws FetchError<404, types.GetTimeOffsQueryForOrganizationResponse404> Operation failed.
   * @throws FetchError<500, types.GetTimeOffsQueryForOrganizationResponse500> Operation failed.
   */
  getTimeOffsQueryForOrganization(metadata?: types.GetTimeOffsQueryForOrganizationMetadataParam): Promise<FetchResponse<200, types.GetTimeOffsQueryForOrganizationResponse200>> {
    return this.core.fetch('/time_offs', 'get', metadata);
  }

  /**
   * Create time-off request
   *  **Token scopes**: `time-off:write`
   *
   * @summary Create time-off request
   * @throws FetchError<400, types.CreateTimeOffResponse400> Operation failed.
   * @throws FetchError<401, types.CreateTimeOffResponse401> Operation failed.
   * @throws FetchError<403, types.CreateTimeOffResponse403> Operation failed.
   * @throws FetchError<404, types.CreateTimeOffResponse404> Operation failed.
   * @throws FetchError<500, types.CreateTimeOffResponse500> Operation failed.
   */
  createTimeOff(body: types.CreateTimeOffBodyParam): Promise<FetchResponse<201, types.CreateTimeOffResponse201>> {
    return this.core.fetch('/time_offs', 'post', body);
  }

  /**
   * Update an invoice adjustment.
   *  **Token scopes**: `invoice-adjustments:write`
   *
   * @summary Update an invoice adjustment
   * @throws FetchError<400, types.UpdateInvoiceAdjustmentResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateInvoiceAdjustmentResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateInvoiceAdjustmentResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateInvoiceAdjustmentResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateInvoiceAdjustmentResponse500> Operation failed.
   */
  updateInvoiceAdjustment(body: types.UpdateInvoiceAdjustmentBodyParam, metadata: types.UpdateInvoiceAdjustmentMetadataParam): Promise<FetchResponse<200, types.UpdateInvoiceAdjustmentResponse200>> {
    return this.core.fetch('/invoice-adjustments/{id}', 'patch', body, metadata);
  }

  /**
   * Delete an adjustment.
   *  **Token scopes**: `invoice-adjustments:write`
   *
   * @summary Delete adjustment
   * @throws FetchError<400, types.DeleteInvoiceAdjustmentResponse400> Operation failed.
   * @throws FetchError<401, types.DeleteInvoiceAdjustmentResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteInvoiceAdjustmentResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteInvoiceAdjustmentResponse404> Operation failed.
   * @throws FetchError<500, types.DeleteInvoiceAdjustmentResponse500> Operation failed.
   */
  deleteInvoiceAdjustment(metadata: types.DeleteInvoiceAdjustmentMetadataParam): Promise<FetchResponse<200, types.DeleteInvoiceAdjustmentResponse200>> {
    return this.core.fetch('/invoice-adjustments/{id}', 'delete', metadata);
  }

  /**
   * Retrieve invoice line item for a given id.
   *  **Token scopes**: `invoice-adjustments:read`
   *
   * @summary Invoice line item by Id
   * @throws FetchError<400, types.GetInvoiceAdjustmentsByIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetInvoiceAdjustmentsByIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetInvoiceAdjustmentsByIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetInvoiceAdjustmentsByIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetInvoiceAdjustmentsByIdResponse500> Operation failed.
   */
  getInvoiceAdjustmentsById(metadata: types.GetInvoiceAdjustmentsByIdMetadataParam): Promise<FetchResponse<200, types.GetInvoiceAdjustmentsByIdResponse200>> {
    return this.core.fetch('/invoice-adjustments/{id}', 'get', metadata);
  }

  /**
   * Delete Bank Details
   *  **Token scopes**: `worker:read`, `worker:write`
   *
   * @summary Delete Bank Details
   * @throws FetchError<400, types.DeleteBankDetailsResponse400> Operation failed.
   * @throws FetchError<401, types.DeleteBankDetailsResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteBankDetailsResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteBankDetailsResponse404> Operation failed.
   * @throws FetchError<500, types.DeleteBankDetailsResponse500> Operation failed.
   */
  deleteBankDetails(metadata: types.DeleteBankDetailsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/payouts/employees/methods/{id}', 'delete', metadata);
  }

  /**
   * Retrieve a list of timesheets in your Deel account. You can filter the list by providing
   * additional paramters e.g. contract_id, contract_type etc.
   *  **Token scopes**: `timesheets:read`
   *
   * @summary List of timesheets
   * @throws FetchError<400, types.GetTimesheetsResponse400> Operation failed.
   * @throws FetchError<401, types.GetTimesheetsResponse401> Operation failed.
   * @throws FetchError<403, types.GetTimesheetsResponse403> Operation failed.
   * @throws FetchError<404, types.GetTimesheetsResponse404> Operation failed.
   * @throws FetchError<500, types.GetTimesheetsResponse500> Operation failed.
   */
  getTimesheets(metadata?: types.GetTimesheetsMetadataParam): Promise<FetchResponse<200, types.GetTimesheetsResponse200>> {
    return this.core.fetch('/timesheets', 'get', metadata);
  }

  /**
   * Submit work for a contractor.
   *  **Token scopes**: `timesheets:write`
   *
   * @summary Create a timesheet entry
   * @throws FetchError<400, types.CreateTimesheetResponse400> Operation failed.
   * @throws FetchError<401, types.CreateTimesheetResponse401> Operation failed.
   * @throws FetchError<403, types.CreateTimesheetResponse403> Operation failed.
   * @throws FetchError<404, types.CreateTimesheetResponse404> Operation failed.
   * @throws FetchError<500, types.CreateTimesheetResponse500> Operation failed.
   */
  createTimesheet(body: types.CreateTimesheetBodyParam): Promise<FetchResponse<201, types.CreateTimesheetResponse201>> {
    return this.core.fetch('/timesheets', 'post', body);
  }

  /**
   * Retrieve the list of background check options.
   *  **Token scopes**: `contracts:read`
   *
   * @summary List of background check options
   * @throws FetchError<400, types.GetBackgroundChecksOptionsResponse400> Operation failed.
   * @throws FetchError<401, types.GetBackgroundChecksOptionsResponse401> Operation failed.
   * @throws FetchError<403, types.GetBackgroundChecksOptionsResponse403> Operation failed.
   * @throws FetchError<404, types.GetBackgroundChecksOptionsResponse404> Operation failed.
   * @throws FetchError<500, types.GetBackgroundChecksOptionsResponse500> Operation failed.
   */
  getBackgroundChecksOptions(metadata?: types.GetBackgroundChecksOptionsMetadataParam): Promise<FetchResponse<200, types.GetBackgroundChecksOptionsResponse200>> {
    return this.core.fetch('/background-checks/options', 'get', metadata);
  }

  /**
   * Get an estimate of the withholding amount required as well as the assumptions behind the
   * estimate, given a contract id, event amount and currency code.
   *  **Token scopes**: `contracts:read`, `global-payroll:read`
   *
   * @summary Get an estimate of withholding amount given an equity event.
   * @throws FetchError<400, types.GetContractEquityWithholdingAmountResponse400> Bad request.
   * @throws FetchError<401, types.GetContractEquityWithholdingAmountResponse401> Operation failed.
   * @throws FetchError<403, types.GetContractEquityWithholdingAmountResponse403> Operation failed.
   * @throws FetchError<404, types.GetContractEquityWithholdingAmountResponse404> Unable to calculate due to missing information.
   * @throws FetchError<500, types.GetContractEquityWithholdingAmountResponse500> Operation failed.
   */
  getContractEquityWithholdingAmount(metadata: types.GetContractEquityWithholdingAmountMetadataParam): Promise<FetchResponse<200, types.GetContractEquityWithholdingAmountResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/equity_withholding_estimate', 'get', metadata);
  }

  /**
   * Returns the necessity of a work visa for a specific country given the employee's
   * nationalities.
   *  **Token scopes**: `immigration:read`
   *
   * @summary Check Visa Requirement
   * @throws FetchError<400, types.CheckVisaRequirementResponse400> Operation failed.
   * @throws FetchError<401, types.CheckVisaRequirementResponse401> Operation failed.
   * @throws FetchError<403, types.CheckVisaRequirementResponse403> Operation failed.
   * @throws FetchError<404, types.CheckVisaRequirementResponse404> Operation failed.
   * @throws FetchError<500, types.CheckVisaRequirementResponse500> Operation failed.
   */
  checkVisaRequirement(metadata: types.CheckVisaRequirementMetadataParam): Promise<FetchResponse<200, types.CheckVisaRequirementResponse200>> {
    return this.core.fetch('/immigration/visa-requirement/{country_code}', 'get', metadata);
  }

  /**
   * Create shifts
   *  **Token scopes**: `time-tracking:write`
   *
   * @summary Create shifts
   * @throws FetchError<400, types.CreateShiftsResponse400> Operation failed.
   * @throws FetchError<401, types.CreateShiftsResponse401> Operation failed.
   * @throws FetchError<403, types.CreateShiftsResponse403> Operation failed.
   * @throws FetchError<404, types.CreateShiftsResponse404> Operation failed.
   * @throws FetchError<500, types.CreateShiftsResponse500> Operation failed.
   */
  createShifts(body: types.CreateShiftsBodyParam): Promise<FetchResponse<201, types.CreateShiftsResponse201>> {
    return this.core.fetch('/time_tracking/shifts', 'post', body);
  }

  /**
   * Retrieve a paginated list of shifts with details such as start and end times, breaks,
   * metadata, and summary metrics. Supports pagination through `limit` and `offset` query
   * parameters.
   *  **Token scopes**: `time-tracking:read`
   *
   * @summary List of shifts
   * @throws FetchError<400, types.GetShiftsResponse400> Invalid request parameters.
   * @throws FetchError<401, types.GetShiftsResponse401> Operation failed.
   * @throws FetchError<403, types.GetShiftsResponse403> Operation failed.
   * @throws FetchError<404, types.GetShiftsResponse404> Operation failed.
   * @throws FetchError<500, types.GetShiftsResponse500> Operation failed.
   */
  getShifts(metadata?: types.GetShiftsMetadataParam): Promise<FetchResponse<200, types.GetShiftsResponse200>> {
    return this.core.fetch('/time_tracking/shifts', 'get', metadata);
  }

  /**
   * Retrieve invoice line items for a given contract id.
   *  **Token scopes**: `invoice-adjustments:read`
   *
   * @summary Invoice line items by contract
   * @throws FetchError<400, types.GetInvoiceAdjustmentsByContractIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetInvoiceAdjustmentsByContractIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetInvoiceAdjustmentsByContractIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetInvoiceAdjustmentsByContractIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetInvoiceAdjustmentsByContractIdResponse500> Operation failed.
   */
  getInvoiceAdjustmentsByContractId(metadata: types.GetInvoiceAdjustmentsByContractIdMetadataParam): Promise<FetchResponse<200, types.GetInvoiceAdjustmentsByContractIdResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/invoice-adjustments', 'get', metadata);
  }

  /**
   * Create a new hourly report root preset.
   *  **Token scopes**: `timesheets:write`
   *
   * @summary Create Hourly Report Root Preset
   * @throws FetchError<400, types.CreateHourlyReportRootPresetResponse400> Bad Request
   * @throws FetchError<401, types.CreateHourlyReportRootPresetResponse401> Operation failed.
   * @throws FetchError<403, types.CreateHourlyReportRootPresetResponse403> Operation failed.
   * @throws FetchError<404, types.CreateHourlyReportRootPresetResponse404> Operation failed.
   * @throws FetchError<500, types.CreateHourlyReportRootPresetResponse500> Operation failed.
   */
  createHourlyReportRootPreset(body: types.CreateHourlyReportRootPresetBodyParam): Promise<FetchResponse<200, types.CreateHourlyReportRootPresetResponse200>> {
    return this.core.fetch('/timesheets/root-presets', 'post', body);
  }

  /**
   * Retrieve a list of hourly report root presets.
   *  **Token scopes**: `timesheets:read`
   *
   * @summary Get Hourly Report Root Presets
   * @throws FetchError<400, types.GetHourlyReportRootPresetsResponse400> Bad Request
   * @throws FetchError<401, types.GetHourlyReportRootPresetsResponse401> Operation failed.
   * @throws FetchError<403, types.GetHourlyReportRootPresetsResponse403> Operation failed.
   * @throws FetchError<404, types.GetHourlyReportRootPresetsResponse404> Operation failed.
   * @throws FetchError<500, types.GetHourlyReportRootPresetsResponse500> Operation failed.
   */
  getHourlyReportRootPresets(metadata?: types.GetHourlyReportRootPresetsMetadataParam): Promise<FetchResponse<200, types.GetHourlyReportRootPresetsResponse200>> {
    return this.core.fetch('/timesheets/root-presets', 'get', metadata);
  }

  /**
   * Create a new Deel contract.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Create a new contract
   * @throws FetchError<400, types.CreateContractResponse400> Operation failed.
   * @throws FetchError<401, types.CreateContractResponse401> Operation failed.
   * @throws FetchError<403, types.CreateContractResponse403> Operation failed.
   * @throws FetchError<404, types.CreateContractResponse404> Operation failed.
   * @throws FetchError<500, types.CreateContractResponse500> Operation failed.
   */
  createContract(body: types.CreateContractBodyParam): Promise<FetchResponse<201, types.CreateContractResponse201>> {
    return this.core.fetch('/contracts', 'post', body);
  }

  /**
   * Retrieve a list of contracts.
   *  **Token scopes**: `contracts:read`
   *
   * @summary List of contracts
   * @throws FetchError<400, types.GetContractListResponse400> Operation failed.
   * @throws FetchError<401, types.GetContractListResponse401> Operation failed.
   * @throws FetchError<403, types.GetContractListResponse403> Operation failed.
   * @throws FetchError<404, types.GetContractListResponse404> Operation failed.
   * @throws FetchError<500, types.GetContractListResponse500> Operation failed.
   */
  getContractList(metadata?: types.GetContractListMetadataParam): Promise<FetchResponse<200, types.GetContractListResponse200>> {
    return this.core.fetch('/contracts', 'get', metadata);
  }

  /**
   * Retrieve a list of predefined seniority levels for roles in the Deel platform, including
   * their names, hierarchical levels, and unique identifiers.
   *
   * @summary Retrieve Seniority Levels
   * @throws FetchError<400, types.GetSeniorityListResponse400> Operation failed.
   * @throws FetchError<401, types.GetSeniorityListResponse401> Operation failed.
   * @throws FetchError<403, types.GetSeniorityListResponse403> Operation failed.
   * @throws FetchError<404, types.GetSeniorityListResponse404> Operation failed.
   * @throws FetchError<500, types.GetSeniorityListResponse500> Operation failed.
   */
  getSeniorityList(): Promise<FetchResponse<200, types.GetSeniorityListResponse200>> {
    return this.core.fetch('/lookups/seniorities', 'get');
  }

  /**
   * Retrieve a list of off-cycle payments for the specified contract ID. Off-cycle payments
   * are payments made outside the regular payment schedule, often for exceptional or
   * one-time expenses.
   *  **Token scopes**: `off-cycle-payments:read`
   *
   * @summary List of off-cycle payments
   * @throws FetchError<400, types.GetOffCyclePaymentsByContractResponse400> Invalid request parameters.
   * @throws FetchError<401, types.GetOffCyclePaymentsByContractResponse401> Operation failed.
   * @throws FetchError<403, types.GetOffCyclePaymentsByContractResponse403> Operation failed.
   * @throws FetchError<404, types.GetOffCyclePaymentsByContractResponse404> Contract not found.
   * @throws FetchError<500, types.GetOffCyclePaymentsByContractResponse500> Internal server error.
   */
  getOffCyclePaymentsByContract(metadata: types.GetOffCyclePaymentsByContractMetadataParam): Promise<FetchResponse<200, types.GetOffCyclePaymentsByContractResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/off-cycle-payments', 'get', metadata);
  }

  /**
   * Add a new invoice line-item for the purpose of an off-cycle payment associated with a
   * specific contract. This is typically used for exceptional payments outside the regular
   * payment schedule.
   *  **Token scopes**: `off-cycle-payments:write`
   *
   * @summary Add off-cycle payment
   * @throws FetchError<400, types.CreateOffCyclePaymentResponse400> Invalid request parameters.
   * @throws FetchError<401, types.CreateOffCyclePaymentResponse401> Operation failed.
   * @throws FetchError<403, types.CreateOffCyclePaymentResponse403> Operation failed.
   * @throws FetchError<404, types.CreateOffCyclePaymentResponse404> Contract not found.
   * @throws FetchError<500, types.CreateOffCyclePaymentResponse500> Internal server error.
   */
  createOffCyclePayment(body: types.CreateOffCyclePaymentBodyParam, metadata: types.CreateOffCyclePaymentMetadataParam): Promise<FetchResponse<201, types.CreateOffCyclePaymentResponse201>> {
    return this.core.fetch('/contracts/{contract_id}/off-cycle-payments', 'post', body, metadata);
  }

  /**
   * Create an equity tax event
   *  **Token scopes**: `equities:write`
   *
   * @summary Equity Tax Events
   * @throws FetchError<400, types.EquityTaxEventsResponse400> Bad request
   * @throws FetchError<401, types.EquityTaxEventsResponse401> Operation failed.
   * @throws FetchError<403, types.EquityTaxEventsResponse403> Operation failed.
   * @throws FetchError<404, types.EquityTaxEventsResponse404> Operation failed.
   * @throws FetchError<500, types.EquityTaxEventsResponse500> Operation failed.
   */
  equityTaxEvents(body: types.EquityTaxEventsBodyParam): Promise<FetchResponse<201, types.EquityTaxEventsResponse201>> {
    return this.core.fetch('/equities/tax-events', 'post', body);
  }

  /**
   * Retrieve a list of all managers in the organization along with pagination details.
   *  **Token scopes**: `organizations:read`
   *
   * @summary Retrieve List of Managers
   * @throws FetchError<400, types.GetManagersResponse400> Operation failed.
   * @throws FetchError<401, types.GetManagersResponse401> Operation failed.
   * @throws FetchError<403, types.GetManagersResponse403> Operation failed.
   * @throws FetchError<404, types.GetManagersResponse404> Operation failed.
   * @throws FetchError<500, types.GetManagersResponse500> Operation failed.
   */
  getManagers(metadata?: types.GetManagersMetadataParam): Promise<FetchResponse<200, types.GetManagersResponse200>> {
    return this.core.fetch('/managers', 'get', metadata);
  }

  /**
   * Create a new manager for the organization by providing the required user details. This
   * endpoint returns the newly created manager's information.
   *  **Token scopes**: `organizations:write`
   *
   * @summary Create a Manager
   * @throws FetchError<400, types.CreateManagerResponse400> Invalid request. The input data did not meet the required validation rules.
   * @throws FetchError<401, types.CreateManagerResponse401> Operation failed.
   * @throws FetchError<403, types.CreateManagerResponse403> Operation failed.
   * @throws FetchError<404, types.CreateManagerResponse404> Operation failed.
   * @throws FetchError<409, types.CreateManagerResponse409> Conflict. A manager with the provided email already exists.
   * @throws FetchError<500, types.CreateManagerResponse500> Operation failed.
   */
  createManager(body: types.CreateManagerBodyParam): Promise<FetchResponse<201, types.CreateManagerResponse201>> {
    return this.core.fetch('/managers', 'post', body);
  }

  /**
   * Request a termination for a global payroll employee. A successful call starts the
   * termination process and does not confirm termination.
   *  **Token scopes**: `global-payroll:write`
   *
   * @summary Request termination
   * @throws FetchError<400, types.RequestTerminationResponse400> Operation failed.
   * @throws FetchError<401, types.RequestTerminationResponse401> Operation failed.
   * @throws FetchError<403, types.RequestTerminationResponse403> Operation failed.
   * @throws FetchError<404, types.RequestTerminationResponse404> Operation failed.
   * @throws FetchError<500, types.RequestTerminationResponse500> Operation failed.
   */
  requestTermination(body: types.RequestTerminationBodyParam, metadata: types.RequestTerminationMetadataParam): Promise<FetchResponse<201, types.RequestTerminationResponse201>> {
    return this.core.fetch('/gp/workers/{worker_id}/terminations', 'post', body, metadata);
  }

  /**
   * Add a new milestone to a specific contract. Milestones represent distinct deliverables
   * or phases in the contract and can include additional details such as attachments.
   *  **Token scopes**: `milestones:write`
   *
   * @summary Create a Milestone
   * @throws FetchError<400, types.CreateMilestoneResponse400> Invalid request. The input data did not meet the required validation rules.
   * @throws FetchError<401, types.CreateMilestoneResponse401> Operation failed.
   * @throws FetchError<403, types.CreateMilestoneResponse403> Operation failed.
   * @throws FetchError<404, types.CreateMilestoneResponse404> The specified contract ID does not exist.
   * @throws FetchError<500, types.CreateMilestoneResponse500> Operation failed.
   */
  createMilestone(body: types.CreateMilestoneBodyParam, metadata: types.CreateMilestoneMetadataParam): Promise<FetchResponse<201, types.CreateMilestoneResponse201>> {
    return this.core.fetch('/contracts/{contract_id}/milestones', 'post', body, metadata);
  }

  /**
   * Retrieve a list of milestones associated with a specific contract. Each milestone
   * includes details such as its title, amount, status, and relevant dates, along with
   * information about the creator and reviewer.
   *  **Token scopes**: `milestones:read`
   *
   * @summary Retrieve Milestones by Contract
   * @throws FetchError<400, types.GetMilestonesByContractResponse400> Operation failed.
   * @throws FetchError<401, types.GetMilestonesByContractResponse401> Operation failed.
   * @throws FetchError<403, types.GetMilestonesByContractResponse403> Operation failed.
   * @throws FetchError<404, types.GetMilestonesByContractResponse404> Operation failed.
   * @throws FetchError<500, types.GetMilestonesByContractResponse500> Operation failed.
   */
  getMilestonesByContract(metadata: types.GetMilestonesByContractMetadataParam): Promise<FetchResponse<200, types.GetMilestonesByContractResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/milestones', 'get', metadata);
  }

  /**
   * Retrieve termination details by hris profile oid
   *  **Token scopes**: `contracts:read`, `people:read`
   *
   * @summary Retrieve termination details
   * @throws FetchError<400, types.GetRetrieveTerminationDetailsResponse400> Operation failed.
   * @throws FetchError<401, types.GetRetrieveTerminationDetailsResponse401> Operation failed.
   * @throws FetchError<403, types.GetRetrieveTerminationDetailsResponse403> Operation failed.
   * @throws FetchError<404, types.GetRetrieveTerminationDetailsResponse404> Operation failed.
   * @throws FetchError<500, types.GetRetrieveTerminationDetailsResponse500> Operation failed.
   */
  getRetrieveTerminationDetails(metadata: types.GetRetrieveTerminationDetailsMetadataParam): Promise<FetchResponse<200, types.GetRetrieveTerminationDetailsResponse200>> {
    return this.core.fetch('/offboarding/tracker/hris_profile/{oid}', 'get', metadata);
  }

  /**
   * Update worker's department
   *  **Token scopes**: `people:write`
   *
   * @summary Update organization structure
   * @throws FetchError<400, types.UpdatePeopleDepartmentResponse400> Operation failed.
   * @throws FetchError<401, types.UpdatePeopleDepartmentResponse401> Operation failed.
   * @throws FetchError<403, types.UpdatePeopleDepartmentResponse403> Operation failed.
   * @throws FetchError<404, types.UpdatePeopleDepartmentResponse404> Operation failed.
   * @throws FetchError<500, types.UpdatePeopleDepartmentResponse500> Operation failed.
   */
  updatePeopleDepartment(body: types.UpdatePeopleDepartmentBodyParam, metadata: types.UpdatePeopleDepartmentMetadataParam): Promise<FetchResponse<200, types.UpdatePeopleDepartmentResponse200>> {
    return this.core.fetch('/people/{id}/department', 'put', body, metadata);
  }

  /**
   * Retrieves list of benefits available in a specific country based work visa requirement,
   * work hours, employment type, team, and legal entity.
   *  **Token scopes**: `benefits:read`
   *
   * @summary Retrieve Benefits by Country
   * @throws FetchError<400, types.RetrieveBenefitsByCountryResponse400> Operation failed.
   * @throws FetchError<401, types.RetrieveBenefitsByCountryResponse401> Operation failed.
   * @throws FetchError<403, types.RetrieveBenefitsByCountryResponse403> Operation failed.
   * @throws FetchError<404, types.RetrieveBenefitsByCountryResponse404> Operation failed.
   * @throws FetchError<500, types.RetrieveBenefitsByCountryResponse500> Operation failed.
   */
  retrieveBenefitsByCountry(metadata: types.RetrieveBenefitsByCountryMetadataParam): Promise<FetchResponse<200, types.RetrieveBenefitsByCountryResponse200>> {
    return this.core.fetch('/eor/benefits', 'get', metadata);
  }

  /**
   * undefined
   *  **Token scopes**: `profile:read`
   *
   * @summary Fetch HrisPositions from a HrisProfile
   * @throws FetchError<400, types.GetHrisPositionsResponse400> Operation failed.
   * @throws FetchError<401, types.GetHrisPositionsResponse401> Operation failed.
   * @throws FetchError<403, types.GetHrisPositionsResponse403> Operation failed.
   * @throws FetchError<404, types.GetHrisPositionsResponse404> Operation failed.
   * @throws FetchError<500, types.GetHrisPositionsResponse500> Operation failed.
   */
  getHrisPositions(metadata: types.GetHrisPositionsMetadataParam): Promise<FetchResponse<200, types.GetHrisPositionsResponse200>> {
    return this.core.fetch('/hris/positions/profile/{hrisProfileId}', 'get', metadata);
  }

  /**
   * Get Bank Details
   *  **Token scopes**: `worker:read`, `worker:write`
   *
   * @summary Get Bank Details
   * @throws FetchError<400, types.GetBankDetailsResponse400> Operation failed.
   * @throws FetchError<401, types.GetBankDetailsResponse401> Operation failed.
   * @throws FetchError<403, types.GetBankDetailsResponse403> Operation failed.
   * @throws FetchError<404, types.GetBankDetailsResponse404> Operation failed.
   * @throws FetchError<500, types.GetBankDetailsResponse500> Operation failed.
   */
  getBankDetails(): Promise<FetchResponse<200, types.GetBankDetailsResponse200>> {
    return this.core.fetch('/payouts/employees/methods', 'get');
  }

  /**
   * Add/Edit Bank Details
   *  **Token scopes**: `worker:read`, `worker:write`
   *
   * @summary Add/Edit Bank Details
   * @throws FetchError<400, types.AddEditBankDetailsResponse400> Operation failed.
   * @throws FetchError<401, types.AddEditBankDetailsResponse401> Operation failed.
   * @throws FetchError<403, types.AddEditBankDetailsResponse403> Operation failed.
   * @throws FetchError<404, types.AddEditBankDetailsResponse404> Operation failed.
   * @throws FetchError<500, types.AddEditBankDetailsResponse500> Operation failed.
   */
  addEditBankDetails(body?: types.AddEditBankDetailsBodyParam): Promise<FetchResponse<200, types.AddEditBankDetailsResponse200>> {
    return this.core.fetch('/payouts/employees/methods', 'post', body);
  }

  /**
   * Update specific fields of an existing shift rate.
   *  **Token scopes**: `time-tracking:write`
   *
   * @summary Update a shift rate
   * @throws FetchError<400, types.UpdateShiftRateResponse400> Invalid request payload
   * @throws FetchError<401, types.UpdateShiftRateResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateShiftRateResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateShiftRateResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateShiftRateResponse500> Operation failed.
   */
  updateShiftRate(body: types.UpdateShiftRateBodyParam, metadata: types.UpdateShiftRateMetadataParam): Promise<FetchResponse<200, types.UpdateShiftRateResponse200>> {
    return this.core.fetch('/time_tracking/shift_rates/{external_id}', 'patch', body, metadata);
  }

  /**
   * Retrieve details of a specific shift rate using its external ID. The response includes
   * information such as the name, type, value, and unique identifier of the shift rate.
   *  **Token scopes**: `time-tracking:read`
   *
   * @summary Retrieve a Shift Rate by External ID
   * @throws FetchError<400, types.GetShiftRateResponse400> Invalid external ID provided or the request is malformed.
   * @throws FetchError<401, types.GetShiftRateResponse401> Operation failed.
   * @throws FetchError<403, types.GetShiftRateResponse403> Operation failed.
   * @throws FetchError<404, types.GetShiftRateResponse404> Shift rate with the given external ID not found.
   * @throws FetchError<500, types.GetShiftRateResponse500> Internal server error occurred while retrieving the shift rate.
   */
  getShiftRate(metadata: types.GetShiftRateMetadataParam): Promise<FetchResponse<200, types.GetShiftRateResponse200>> {
    return this.core.fetch('/time_tracking/shift_rates/{external_id}', 'get', metadata);
  }

  /**
   * Delete a ShiftRate by external ID
   *  **Token scopes**: `time-tracking:write`
   *
   * @summary Delete a ShiftRate by external ID
   * @throws FetchError<400, types.DeleteShiftRateExternalIdResponse400> Operation failed.
   * @throws FetchError<401, types.DeleteShiftRateExternalIdResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteShiftRateExternalIdResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteShiftRateExternalIdResponse404> Operation failed.
   * @throws FetchError<500, types.DeleteShiftRateExternalIdResponse500> Operation failed.
   */
  deleteShiftRateExternalId(metadata: types.DeleteShiftRateExternalIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/time_tracking/shift_rates/{external_id}', 'delete', metadata);
  }

  /**
   * Add bank account for an EOR employee.
   *  **Token scopes**: `worker:write`
   *
   * @summary Add bank account
   * @throws FetchError<400, types.AddEorBankAccountResponse400> Operation failed.
   * @throws FetchError<401, types.AddEorBankAccountResponse401> Operation failed.
   * @throws FetchError<403, types.AddEorBankAccountResponse403> Operation failed.
   * @throws FetchError<404, types.AddEorBankAccountResponse404> Operation failed.
   * @throws FetchError<500, types.AddEorBankAccountResponse500> Operation failed.
   */
  addEORBankAccount(body: types.AddEorBankAccountBodyParam): Promise<FetchResponse<201, types.AddEorBankAccountResponse201>> {
    return this.core.fetch('/eor/workers/banks', 'post', body);
  }

  /**
   * Retrieve custom fields for a worker
   *  **Token scopes**: `people:read`
   *
   * @summary Retrieve custom fields for a worker
   * @throws FetchError<400, types.GetCustomFieldValuesFromWorkerResponse400> Operation failed.
   * @throws FetchError<401, types.GetCustomFieldValuesFromWorkerResponse401> Operation failed.
   * @throws FetchError<403, types.GetCustomFieldValuesFromWorkerResponse403> Operation failed.
   * @throws FetchError<404, types.GetCustomFieldValuesFromWorkerResponse404> Operation failed.
   * @throws FetchError<500, types.GetCustomFieldValuesFromWorkerResponse500> Operation failed.
   */
  getCustomFieldValuesFromWorker(metadata: types.GetCustomFieldValuesFromWorkerMetadataParam): Promise<FetchResponse<200, types.GetCustomFieldValuesFromWorkerResponse200>> {
    return this.core.fetch('/people/{worker_id}/custom_fields', 'get', metadata);
  }

  /**
   * Update custom field value.
   *  **Token scopes**: `people:write`
   *
   * @summary Update custom field value
   * @throws FetchError<400, types.UpsertCustomFieldValueFromWorkerResponse400> Operation failed.
   * @throws FetchError<401, types.UpsertCustomFieldValueFromWorkerResponse401> Operation failed.
   * @throws FetchError<403, types.UpsertCustomFieldValueFromWorkerResponse403> Operation failed.
   * @throws FetchError<500, types.UpsertCustomFieldValueFromWorkerResponse500> Operation failed.
   */
  upsertCustomFieldValueFromWorker(body: types.UpsertCustomFieldValueFromWorkerBodyParam, metadata: types.UpsertCustomFieldValueFromWorkerMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/people/{worker_id}/custom_fields', 'put', body, metadata);
  }

  /**
   * Retrieve a single contract.
   *  **Token scopes**: `contracts:read`
   *
   * @summary Retrieve a single contract
   * @throws FetchError<400, types.GetContractByIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetContractByIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetContractByIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetContractByIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetContractByIdResponse500> Operation failed.
   */
  getContractById(metadata: types.GetContractByIdMetadataParam): Promise<FetchResponse<200, types.GetContractByIdResponse200>> {
    return this.core.fetch('/contracts/{contract_id}', 'get', metadata);
  }

  /**
   * Add an external Id to a Deel contract. You can use this to add a Deel contract's
   * refernece Id in your platform. External Id can be passed as a query parameter in List
   * contract endpoint to find this contract later.
   *  **Token scopes**: `contracts:write`
   *
   * @summary External Id
   * @throws FetchError<400, types.ExternalIdResponse400> Operation failed.
   * @throws FetchError<401, types.ExternalIdResponse401> Operation failed.
   * @throws FetchError<403, types.ExternalIdResponse403> Operation failed.
   * @throws FetchError<404, types.ExternalIdResponse404> Operation failed.
   * @throws FetchError<500, types.ExternalIdResponse500> Operation failed.
   */
  externalId(body: types.ExternalIdBodyParam, metadata: types.ExternalIdMetadataParam): Promise<FetchResponse<200, types.ExternalIdResponse200>> {
    return this.core.fetch('/contracts/{contract_id}', 'patch', body, metadata);
  }

  /**
   * Retrieve termination details by tracker id
   *  **Token scopes**: `contracts:read`, `people:read`
   *
   * @summary Retrieve termination details
   * @throws FetchError<400, types.GetRetrieveTerminationDetailsByIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetRetrieveTerminationDetailsByIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetRetrieveTerminationDetailsByIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetRetrieveTerminationDetailsByIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetRetrieveTerminationDetailsByIdResponse500> Operation failed.
   */
  getRetrieveTerminationDetailsById(metadata: types.GetRetrieveTerminationDetailsByIdMetadataParam): Promise<FetchResponse<200, types.GetRetrieveTerminationDetailsByIdResponse200>> {
    return this.core.fetch('/offboarding/tracker/{id}', 'get', metadata);
  }

  /**
   * Get the download link for an employee compliance document template, if it exists.
   *  **Token scopes**: `worker:read`
   *
   * @summary Download employee compliance document template
   * @throws FetchError<400, types.GetEorEmployeeComplianceDocumentTemplateResponse400> Operation failed.
   * @throws FetchError<401, types.GetEorEmployeeComplianceDocumentTemplateResponse401> Operation failed.
   * @throws FetchError<403, types.GetEorEmployeeComplianceDocumentTemplateResponse403> Operation failed.
   * @throws FetchError<404, types.GetEorEmployeeComplianceDocumentTemplateResponse404> Operation failed.
   * @throws FetchError<500, types.GetEorEmployeeComplianceDocumentTemplateResponse500> Operation failed.
   */
  getEOREmployeeComplianceDocumentTemplate(metadata: types.GetEorEmployeeComplianceDocumentTemplateMetadataParam): Promise<FetchResponse<200, types.GetEorEmployeeComplianceDocumentTemplateResponse200>> {
    return this.core.fetch('/eor/workers/compliance-documents/{document_id}/templates/download', 'get', metadata);
  }

  /**
   * Update specific fields of an existing shift by its unique `external_id`. This includes
   * shift metadata (start and end times, breaks, and approval dates) and associated summary
   * details.
   *  **Token scopes**: `time-tracking:write`
   *
   * @summary Update a shift
   * @throws FetchError<400, types.UpdateShiftResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateShiftResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateShiftResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateShiftResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateShiftResponse500> Operation failed.
   */
  updateShift(body: types.UpdateShiftBodyParam, metadata: types.UpdateShiftMetadataParam): Promise<FetchResponse<200, types.UpdateShiftResponse200>> {
    return this.core.fetch('/time_tracking/shifts/{external_id}', 'patch', body, metadata);
  }

  /**
   * This endpoint deletes a shift using its external ID. Once deleted, the shift will no
   * longer be retrievable or editable.
   *  **Token scopes**: `time-tracking:write`
   *
   * @summary Delete a Shift by External ID
   * @throws FetchError<400, types.DeleteShiftExternalIdResponse400> Invalid external ID provided or the request is malformed.
   * @throws FetchError<401, types.DeleteShiftExternalIdResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteShiftExternalIdResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteShiftExternalIdResponse404> Shift with the given external ID was not found.
   * @throws FetchError<500, types.DeleteShiftExternalIdResponse500> Internal server error while attempting to delete the shift.
   */
  deleteShiftExternalId(metadata: types.DeleteShiftExternalIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/time_tracking/shifts/{external_id}', 'delete', metadata);
  }

  /**
   * Retrieve details of a specific shift by external ID.
   *  **Token scopes**: `time-tracking:read`
   *
   * @summary Get shift details
   * @throws FetchError<400, types.GetShiftDetailsResponse400> Invalid request parameters
   * @throws FetchError<401, types.GetShiftDetailsResponse401> Operation failed.
   * @throws FetchError<403, types.GetShiftDetailsResponse403> Operation failed.
   * @throws FetchError<404, types.GetShiftDetailsResponse404> Operation failed.
   * @throws FetchError<500, types.GetShiftDetailsResponse500> Operation failed.
   */
  getShiftDetails(metadata: types.GetShiftDetailsMetadataParam): Promise<FetchResponse<200, types.GetShiftDetailsResponse200>> {
    return this.core.fetch('/time_tracking/shifts/{external_id}', 'get', metadata);
  }

  /**
   * Update Global Payroll employee information.
   *  **Token scopes**: `people:write`
   *
   * @summary Update employee information
   * @throws FetchError<400, types.UpdateGpEmployeeInformationResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateGpEmployeeInformationResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateGpEmployeeInformationResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateGpEmployeeInformationResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateGpEmployeeInformationResponse500> Operation failed.
   */
  updateGPEmployeeInformation(body: types.UpdateGpEmployeeInformationBodyParam, metadata: types.UpdateGpEmployeeInformationMetadataParam): Promise<FetchResponse<201, types.UpdateGpEmployeeInformationResponse201>> {
    return this.core.fetch('/gp/workers/{worker_id}/employee-information', 'patch', body, metadata);
  }

  /**
   * Create a new adjustment.
   *  **Token scopes**: `adjustments:write`
   *
   * @summary Create a new adjustment
   * @throws FetchError<400, types.CreateAdjustmentResponse400> Operation failed.
   * @throws FetchError<401, types.CreateAdjustmentResponse401> Operation failed.
   * @throws FetchError<403, types.CreateAdjustmentResponse403> Operation failed.
   * @throws FetchError<404, types.CreateAdjustmentResponse404> Operation failed.
   * @throws FetchError<500, types.CreateAdjustmentResponse500> Operation failed.
   */
  createAdjustment(body: types.CreateAdjustmentBodyParam): Promise<FetchResponse<201, types.CreateAdjustmentResponse201>> {
    return this.core.fetch('/adjustments', 'post', body);
  }

  /**
   * Create EOR Worker
   *  **Token scopes**: `people:write`
   *
   * @summary Create EOR Worker
   * @throws FetchError<400, types.CreateEorWorkerResponse400> Operation failed.
   * @throws FetchError<401, types.CreateEorWorkerResponse401> Operation failed.
   * @throws FetchError<403, types.CreateEorWorkerResponse403> Operation failed.
   * @throws FetchError<404, types.CreateEorWorkerResponse404> Operation failed.
   * @throws FetchError<500, types.CreateEorWorkerResponse500> Operation failed.
   */
  createEorWorker(body: types.CreateEorWorkerBodyParam): Promise<FetchResponse<200, types.CreateEorWorkerResponse200>> {
    return this.core.fetch('/eor/worker', 'post', body);
  }

  /**
   * Retrieve a list of departments within the organization associated with the authenticated
   * user. Each department contains its unique identifier, name, and optionally, the parent
   * department if applicable.
   *  **Token scopes**: `organizations:read`
   *
   * @summary Retrieve Departments
   * @throws FetchError<400, types.GetDepartmentsResponse400> Operation failed.
   * @throws FetchError<401, types.GetDepartmentsResponse401> Unauthorized. The request is missing authentication credentials or the credentials
   * provided are invalid.
   * @throws FetchError<403, types.GetDepartmentsResponse403> Operation failed.
   * @throws FetchError<404, types.GetDepartmentsResponse404> No departments found. There are no departments associated with the current
   * organization.
   * @throws FetchError<500, types.GetDepartmentsResponse500> Internal server error. An error occurred on the server while processing the request.
   */
  getDepartments(): Promise<FetchResponse<200, types.GetDepartmentsResponse200>> {
    return this.core.fetch('/departments', 'get');
  }

  /**
   * Retrieve a URL to download a specific payslip PDF for a EoR worker. This endpoint is
   * useful for accessing detailed payment records in a portable document format.
   *  **Token scopes**: `payslips:read`
   *
   * @summary Retrieve payslip PDF download link
   * @throws FetchError<400, types.GetEorWorkerPayslipDownloadUrlResponse400> Invalid request. Either the worker ID or payslip ID is malformed.
   * @throws FetchError<401, types.GetEorWorkerPayslipDownloadUrlResponse401> Operation failed.
   * @throws FetchError<403, types.GetEorWorkerPayslipDownloadUrlResponse403> Operation failed.
   * @throws FetchError<404, types.GetEorWorkerPayslipDownloadUrlResponse404> Payslip not found. The specified worker ID or payslip ID does not match any records.
   * @throws FetchError<500, types.GetEorWorkerPayslipDownloadUrlResponse500> Operation failed.
   */
  getEORWorkerPayslipDownloadUrl(metadata: types.GetEorWorkerPayslipDownloadUrlMetadataParam): Promise<FetchResponse<200, types.GetEorWorkerPayslipDownloadUrlResponse200>> {
    return this.core.fetch('/eor/workers/{worker_id}/payslips/{payslip_id}/download', 'get', metadata);
  }

  /**
   * Review a single invoice adjustment to approve or decline it.
   *  **Token scopes**: `invoice-adjustments:write`
   *
   * @summary Review a single invoice adjustment
   * @throws FetchError<400, types.UpdateInvoiceAdjustmentByIdResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateInvoiceAdjustmentByIdResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateInvoiceAdjustmentByIdResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateInvoiceAdjustmentByIdResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateInvoiceAdjustmentByIdResponse500> Operation failed.
   */
  updateInvoiceAdjustmentById(body: types.UpdateInvoiceAdjustmentByIdBodyParam, metadata: types.UpdateInvoiceAdjustmentByIdMetadataParam): Promise<FetchResponse<201, types.UpdateInvoiceAdjustmentByIdResponse201>> {
    return this.core.fetch('/invoice-adjustments/{id}/reviews', 'post', body, metadata);
  }

  /**
   * List of worker relations.
   *  **Token scopes**: `profile:read`
   *
   * @summary List of worker relations
   * @throws FetchError<400, types.GetAllProfileWorkerRelationsResponse400> Operation failed.
   * @throws FetchError<401, types.GetAllProfileWorkerRelationsResponse401> Operation failed.
   * @throws FetchError<403, types.GetAllProfileWorkerRelationsResponse403> Operation failed.
   * @throws FetchError<404, types.GetAllProfileWorkerRelationsResponse404> Operation failed.
   * @throws FetchError<500, types.GetAllProfileWorkerRelationsResponse500> Operation failed.
   */
  getAllProfileWorkerRelations(metadata: types.GetAllProfileWorkerRelationsMetadataParam): Promise<FetchResponse<200, types.GetAllProfileWorkerRelationsResponse200>> {
    return this.core.fetch('/hris/worker_relations/profile/{hrisProfileOid}', 'get', metadata);
  }

  /**
   * Delete a worker relation.
   *  **Token scopes**: `profile:write`
   *
   * @summary Delete a worker relation
   * @throws FetchError<400, types.DeleteWorkerRelationResponse400> Operation failed.
   * @throws FetchError<401, types.DeleteWorkerRelationResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteWorkerRelationResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteWorkerRelationResponse404> Operation failed.
   * @throws FetchError<500, types.DeleteWorkerRelationResponse500> Operation failed.
   */
  deleteWorkerRelation(metadata: types.DeleteWorkerRelationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/hris/worker_relations/profile/{hrisProfileOid}', 'delete', metadata);
  }

  /**
   * Get legal entity payroll settings from organization integrated with external benefits
   * vendor
   *  **Token scopes**: `organizations:read`
   *
   * @summary Get legal entity payroll settings from organization integrated with external benefits
   * vendor
   * @throws FetchError<400, types.GetLegalEntityPayrollSettingsResponse400> Operation failed.
   * @throws FetchError<401, types.GetLegalEntityPayrollSettingsResponse401> Operation failed.
   * @throws FetchError<403, types.GetLegalEntityPayrollSettingsResponse403> Operation failed.
   * @throws FetchError<404, types.GetLegalEntityPayrollSettingsResponse404> Operation failed.
   * @throws FetchError<500, types.GetLegalEntityPayrollSettingsResponse500> Operation failed.
   */
  getLegalEntityPayrollSettings(metadata: types.GetLegalEntityPayrollSettingsMetadataParam): Promise<FetchResponse<200, types.GetLegalEntityPayrollSettingsResponse200>> {
    return this.core.fetch('/benefits/legal-entities/{id}/payroll-settings', 'get', metadata);
  }

  /**
   * Update the address of a Global Payroll employee.
   *  **Token scopes**: `people:write`
   *
   * @summary Update address
   * @throws FetchError<400, types.UpdateGpEmployeeAddressResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateGpEmployeeAddressResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateGpEmployeeAddressResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateGpEmployeeAddressResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateGpEmployeeAddressResponse500> Operation failed.
   */
  updateGPEmployeeAddress(body: types.UpdateGpEmployeeAddressBodyParam, metadata: types.UpdateGpEmployeeAddressMetadataParam): Promise<FetchResponse<201, types.UpdateGpEmployeeAddressResponse201>> {
    return this.core.fetch('/gp/workers/{worker_id}/address', 'patch', body, metadata);
  }

  /**
   * Update a single timesheet entry.
   *  **Token scopes**: `timesheets:write`
   *
   * @summary Update a timesheet entry
   * @throws FetchError<400, types.UpdateTimesheetByIdResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateTimesheetByIdResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateTimesheetByIdResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateTimesheetByIdResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateTimesheetByIdResponse500> Operation failed.
   */
  updateTimesheetById(body: types.UpdateTimesheetByIdBodyParam, metadata: types.UpdateTimesheetByIdMetadataParam): Promise<FetchResponse<201, types.UpdateTimesheetByIdResponse201>> {
    return this.core.fetch('/timesheets/{id}', 'patch', body, metadata);
  }

  /**
   * Retrieve a single timesheet entry by Id.
   *  **Token scopes**: `timesheets:read`
   *
   * @summary Retrieve a single timesheet entry
   * @throws FetchError<400, types.GetTimesheetByIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetTimesheetByIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetTimesheetByIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetTimesheetByIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetTimesheetByIdResponse500> Operation failed.
   */
  getTimesheetById(metadata: types.GetTimesheetByIdMetadataParam): Promise<FetchResponse<200, types.GetTimesheetByIdResponse200>> {
    return this.core.fetch('/timesheets/{id}', 'get', metadata);
  }

  /**
   * Delete a single timesheet entry.
   *  **Token scopes**: `timesheets:write`
   *
   * @summary Delete a timesheet entry
   * @throws FetchError<400, types.DeleteTimesheetByIdResponse400> Operation failed.
   * @throws FetchError<401, types.DeleteTimesheetByIdResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteTimesheetByIdResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteTimesheetByIdResponse404> Operation failed.
   * @throws FetchError<500, types.DeleteTimesheetByIdResponse500> Operation failed.
   */
  deleteTimesheetById(metadata: types.DeleteTimesheetByIdMetadataParam): Promise<FetchResponse<200, types.DeleteTimesheetByIdResponse200>> {
    return this.core.fetch('/timesheets/{id}', 'delete', metadata);
  }

  /**
   * Create background check.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Create background check
   * @throws FetchError<400, types.CreateBackgroundCheckForContractsResponse400> Operation failed.
   * @throws FetchError<401, types.CreateBackgroundCheckForContractsResponse401> Operation failed.
   * @throws FetchError<403, types.CreateBackgroundCheckForContractsResponse403> Operation failed.
   * @throws FetchError<404, types.CreateBackgroundCheckForContractsResponse404> Operation failed.
   * @throws FetchError<500, types.CreateBackgroundCheckForContractsResponse500> Operation failed.
   */
  createBackgroundCheckForContracts(body: types.CreateBackgroundCheckForContractsBodyParam): Promise<FetchResponse<201, types.CreateBackgroundCheckForContractsResponse201>> {
    return this.core.fetch('/background-checks/regular', 'post', body);
  }

  /**
   * Create a new hourly report preset.
   *  **Token scopes**: `timesheets:write`
   *
   * @summary Create Hourly Report Preset
   * @throws FetchError<400, types.CreateHourlyReportPresetResponse400> Bad Request
   * @throws FetchError<401, types.CreateHourlyReportPresetResponse401> Operation failed.
   * @throws FetchError<403, types.CreateHourlyReportPresetResponse403> Forbidden
   * @throws FetchError<404, types.CreateHourlyReportPresetResponse404> Operation failed.
   * @throws FetchError<500, types.CreateHourlyReportPresetResponse500> Operation failed.
   */
  createHourlyReportPreset(body: types.CreateHourlyReportPresetBodyParam): Promise<FetchResponse<201, types.CreateHourlyReportPresetResponse201>> {
    return this.core.fetch('/timesheets/presets', 'post', body);
  }

  /**
   * Retrieve a single milestone.
   *  **Token scopes**: `milestones:read`
   *
   * @summary Retrieve a single milestone
   * @throws FetchError<400, types.GetMilestonesByContractAndIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetMilestonesByContractAndIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetMilestonesByContractAndIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetMilestonesByContractAndIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetMilestonesByContractAndIdResponse500> Operation failed.
   */
  getMilestonesByContractAndId(metadata: types.GetMilestonesByContractAndIdMetadataParam): Promise<FetchResponse<200, types.GetMilestonesByContractAndIdResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/milestones/{milestone_id}', 'get', metadata);
  }

  /**
   * Delete a specific milestone associated with a contract. This operation removes the
   * milestone and its data permanently from the system.
   *  **Token scopes**: `milestones:write`
   *
   * @summary Delete a Milestone
   * @throws FetchError<400, types.DeleteMilestoneByIdResponse400> Invalid request. The provided contract or milestone ID is invalid.
   * @throws FetchError<401, types.DeleteMilestoneByIdResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteMilestoneByIdResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteMilestoneByIdResponse404> Contract or milestone not found.
   * @throws FetchError<500, types.DeleteMilestoneByIdResponse500> Server error. Something went wrong while processing the request.
   */
  deleteMilestoneById(metadata: types.DeleteMilestoneByIdMetadataParam): Promise<FetchResponse<200, types.DeleteMilestoneByIdResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/milestones/{milestone_id}', 'delete', metadata);
  }

  /**
   * Fetch all custom fields associated with People records, offering additional personalized
   * information.
   *  **Token scopes**: `people:read`
   *
   * @summary List all custom fields
   * @throws FetchError<400, types.GetCustomFieldsFromPeopleResponse400> Operation failed.
   * @throws FetchError<401, types.GetCustomFieldsFromPeopleResponse401> Operation failed.
   * @throws FetchError<403, types.GetCustomFieldsFromPeopleResponse403> Operation failed.
   * @throws FetchError<404, types.GetCustomFieldsFromPeopleResponse404> Operation failed.
   * @throws FetchError<500, types.GetCustomFieldsFromPeopleResponse500> Operation failed.
   */
  getCustomFieldsFromPeople(): Promise<FetchResponse<200, types.GetCustomFieldsFromPeopleResponse200>> {
    return this.core.fetch('/people/custom_fields', 'get');
  }

  /**
   * Update 401k plan
   *  **Token scopes**: `benefits:write`
   *
   * @summary Update 401k plan
   * @throws FetchError<400, types.Put401KPlansDefinitionResponse400> Operation failed.
   * @throws FetchError<401, types.Put401KPlansDefinitionResponse401> Operation failed.
   * @throws FetchError<403, types.Put401KPlansDefinitionResponse403> Operation failed.
   * @throws FetchError<404, types.Put401KPlansDefinitionResponse404> Operation failed.
   * @throws FetchError<500, types.Put401KPlansDefinitionResponse500> Operation failed.
   */
  put401kPlansDefinition(body: types.Put401KPlansDefinitionBodyParam, metadata: types.Put401KPlansDefinitionMetadataParam): Promise<FetchResponse<200, types.Put401KPlansDefinitionResponse200>> {
    return this.core.fetch('/benefits/legal-entities/{id}/401k/plans/{plan_id}', 'put', body, metadata);
  }

  /**
   * Delete a 401k plan
   *  **Token scopes**: `benefits:write`
   *
   * @summary Delete a 401k plan
   * @throws FetchError<400, types.Delete401KPlanDefinitionResponse400> Operation failed.
   * @throws FetchError<401, types.Delete401KPlanDefinitionResponse401> Operation failed.
   * @throws FetchError<403, types.Delete401KPlanDefinitionResponse403> Operation failed.
   * @throws FetchError<404, types.Delete401KPlanDefinitionResponse404> Operation failed.
   * @throws FetchError<500, types.Delete401KPlanDefinitionResponse500> Operation failed.
   */
  delete401kPlanDefinition(metadata: types.Delete401KPlanDefinitionMetadataParam): Promise<FetchResponse<204, types.Delete401KPlanDefinitionResponse204>> {
    return this.core.fetch('/benefits/legal-entities/{id}/401k/plans/{plan_id}', 'delete', metadata);
  }

  /**
   * Retrieve a list of tasks associated with a specific contract. Each task contains details
   * such as its ID, amount, submission date, status, and description. This endpoint is
   * useful for tracking the progress and status of tasks related to contracts.
   *  **Token scopes**: `contracts:read`
   *
   * @summary List of tasks
   * @throws FetchError<400, types.GetTasksByContractResponse400> Operation failed.
   * @throws FetchError<401, types.GetTasksByContractResponse401> Operation failed.
   * @throws FetchError<403, types.GetTasksByContractResponse403> Operation failed.
   * @throws FetchError<404, types.GetTasksByContractResponse404> Operation failed.
   * @throws FetchError<500, types.GetTasksByContractResponse500> Operation failed.
   */
  getTasksByContract(metadata: types.GetTasksByContractMetadataParam): Promise<FetchResponse<200, types.GetTasksByContractResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/tasks', 'get', metadata);
  }

  /**
   * Create a new task for a contractor associated with a specific Deel contract. A task can
   * include details like amount, description, submission date.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Create a new task
   * @throws FetchError<400, types.CreateContractPgoTakResponse400> Bad request. Missing required fields or invalid data format.
   * @throws FetchError<401, types.CreateContractPgoTakResponse401> Unauthorized. Authentication credentials are missing or invalid.
   * @throws FetchError<403, types.CreateContractPgoTakResponse403> Operation failed.
   * @throws FetchError<404, types.CreateContractPgoTakResponse404> Operation failed.
   * @throws FetchError<500, types.CreateContractPgoTakResponse500> Internal server error. An unexpected error occurred while processing the request.
   */
  createContractPgoTak(body: types.CreateContractPgoTakBodyParam, metadata: types.CreateContractPgoTakMetadataParam): Promise<FetchResponse<201, types.CreateContractPgoTakResponse201>> {
    return this.core.fetch('/contracts/{contract_id}/tasks', 'post', body, metadata);
  }

  /**
   * undefined
   *  **Token scopes**: `organizations:write`
   *
   * @summary Update an existing HRIS Org Structure by external ID
   * @throws FetchError<400, types.UpdateOrgStructureByExternalIdResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateOrgStructureByExternalIdResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateOrgStructureByExternalIdResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateOrgStructureByExternalIdResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateOrgStructureByExternalIdResponse500> Operation failed.
   */
  updateOrgStructureByExternalId(body: types.UpdateOrgStructureByExternalIdBodyParam, metadata: types.UpdateOrgStructureByExternalIdMetadataParam): Promise<FetchResponse<200, types.UpdateOrgStructureByExternalIdResponse200>> {
    return this.core.fetch('/hris/organization_structures/external/{external_id}', 'patch', body, metadata);
  }

  /**
   * undefined
   *  **Token scopes**: `organizations:read`
   *
   * @summary Fetch an Org Structure from the Organization
   * @throws FetchError<400, types.GetOrgStructureByExternalIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetOrgStructureByExternalIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetOrgStructureByExternalIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetOrgStructureByExternalIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetOrgStructureByExternalIdResponse500> Operation failed.
   */
  getOrgStructureByExternalId(metadata: types.GetOrgStructureByExternalIdMetadataParam): Promise<FetchResponse<200, types.GetOrgStructureByExternalIdResponse200>> {
    return this.core.fetch('/hris/organization_structures/external/{external_id}', 'get', metadata);
  }

  /**
   * undefined
   *  **Token scopes**: `organizations:write`
   *
   * @summary Delete an Org Structure from the Organization by external ID
   * @throws FetchError<400, types.DeleteOrgStructureByExternalIdResponse400> Operation failed.
   * @throws FetchError<401, types.DeleteOrgStructureByExternalIdResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteOrgStructureByExternalIdResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteOrgStructureByExternalIdResponse404> Operation failed.
   * @throws FetchError<500, types.DeleteOrgStructureByExternalIdResponse500> Operation failed.
   */
  deleteOrgStructureByExternalId(metadata: types.DeleteOrgStructureByExternalIdMetadataParam): Promise<FetchResponse<200, types.DeleteOrgStructureByExternalIdResponse200>> {
    return this.core.fetch('/hris/organization_structures/external/{external_id}', 'delete', metadata);
  }

  /**
   * Add additional information for an EOR employee.
   *  **Token scopes**: `worker:write`
   *
   * @summary Add additional information
   * @throws FetchError<400, types.AddEorWorkerAdditionalInformationResponse400> Operation failed.
   * @throws FetchError<401, types.AddEorWorkerAdditionalInformationResponse401> Operation failed.
   * @throws FetchError<403, types.AddEorWorkerAdditionalInformationResponse403> Operation failed.
   * @throws FetchError<404, types.AddEorWorkerAdditionalInformationResponse404> Operation failed.
   * @throws FetchError<500, types.AddEorWorkerAdditionalInformationResponse500> Operation failed.
   */
  addEorWorkerAdditionalInformation(body: types.AddEorWorkerAdditionalInformationBodyParam, metadata: types.AddEorWorkerAdditionalInformationMetadataParam): Promise<FetchResponse<200, types.AddEorWorkerAdditionalInformationResponse200>> {
    return this.core.fetch('/eor/workers/contracts/{contract_id}/additional-information', 'post', body, metadata);
  }

  /**
   * Retrieve all additional costs to eor quote flow by country
   *  **Token scopes**: `contracts:read`
   *
   * @summary Get EOR Additional Costs
   * @throws FetchError<400, types.GetEorAdditionalCostsResponse400> Operation failed.
   * @throws FetchError<401, types.GetEorAdditionalCostsResponse401> Operation failed.
   * @throws FetchError<403, types.GetEorAdditionalCostsResponse403> Operation failed.
   * @throws FetchError<404, types.GetEorAdditionalCostsResponse404> Operation failed.
   * @throws FetchError<500, types.GetEorAdditionalCostsResponse500> Operation failed.
   */
  getEorAdditionalCosts(metadata: types.GetEorAdditionalCostsMetadataParam): Promise<FetchResponse<200, types.GetEorAdditionalCostsResponse200>> {
    return this.core.fetch('/eor/additional-costs/{country}', 'get', metadata);
  }

  /**
   * List all the groups in your organization.
   *  **Token scopes**: `groups:read`
   *
   * @summary Return list of groups
   * @throws FetchError<400, types.GetGroupsResponse400> Invalid request parameters.
   * @throws FetchError<401, types.GetGroupsResponse401> Operation failed.
   * @throws FetchError<403, types.GetGroupsResponse403> Operation failed.
   * @throws FetchError<404, types.GetGroupsResponse404> Operation failed.
   * @throws FetchError<500, types.GetGroupsResponse500> Operation failed.
   */
  getGroups(metadata?: types.GetGroupsMetadataParam): Promise<FetchResponse<200, types.GetGroupsResponse200>> {
    return this.core.fetch('/groups', 'get', metadata);
  }

  /**
   * Create a new group within your organization.
   *  **Token scopes**: `groups:read`, `groups:write`
   *
   * @summary Create a group
   * @throws FetchError<400, types.CreateGroupResponse400> Invalid request payload
   * @throws FetchError<401, types.CreateGroupResponse401> Operation failed.
   * @throws FetchError<403, types.CreateGroupResponse403> Operation failed.
   * @throws FetchError<404, types.CreateGroupResponse404> Operation failed.
   * @throws FetchError<500, types.CreateGroupResponse500> Operation failed.
   */
  createGroup(body: types.CreateGroupBodyParam): Promise<FetchResponse<200, types.CreateGroupResponse200>> {
    return this.core.fetch('/groups', 'post', body);
  }

  /**
   * Update an adjustment.
   *  **Token scopes**: `adjustments:write`
   *
   * @summary Update an adjustment
   * @throws FetchError<400, types.UpdateAdjustmentResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateAdjustmentResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateAdjustmentResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateAdjustmentResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateAdjustmentResponse500> Operation failed.
   */
  updateAdjustment(body: types.UpdateAdjustmentBodyParam, metadata: types.UpdateAdjustmentMetadataParam): Promise<FetchResponse<200, types.UpdateAdjustmentResponse200>> {
    return this.core.fetch('/adjustments/{id}', 'patch', body, metadata);
  }

  /**
   * Retrieve an adjustment.
   *  **Token scopes**: `adjustments:read`
   *
   * @summary Retrieve an adjustment
   * @throws FetchError<400, types.GetAdjustmentsByIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetAdjustmentsByIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetAdjustmentsByIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetAdjustmentsByIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetAdjustmentsByIdResponse500> Operation failed.
   */
  getAdjustmentsById(metadata: types.GetAdjustmentsByIdMetadataParam): Promise<FetchResponse<200, types.GetAdjustmentsByIdResponse200>> {
    return this.core.fetch('/adjustments/{id}', 'get', metadata);
  }

  /**
   * Delete an adjustment.
   *  **Token scopes**: `adjustments:write`
   *
   * @summary Delete an adjustment
   * @throws FetchError<400, types.DeleteAdjustmentResponse400> Operation failed.
   * @throws FetchError<401, types.DeleteAdjustmentResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteAdjustmentResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteAdjustmentResponse404> Operation failed.
   * @throws FetchError<500, types.DeleteAdjustmentResponse500> Operation failed.
   */
  deleteAdjustment(metadata: types.DeleteAdjustmentMetadataParam): Promise<FetchResponse<200, types.DeleteAdjustmentResponse200>> {
    return this.core.fetch('/adjustments/{id}', 'delete', metadata);
  }

  /**
   * Get worker's personal information by using identifier.
   *  **Token scopes**: `people:read`
   *
   * @summary Get personal information by id
   * @throws FetchError<400, types.GetPeoplePersonalInformationByIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetPeoplePersonalInformationByIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetPeoplePersonalInformationByIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetPeoplePersonalInformationByIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetPeoplePersonalInformationByIdResponse500> Operation failed.
   */
  getPeoplePersonalInformationById(metadata: types.GetPeoplePersonalInformationByIdMetadataParam): Promise<FetchResponse<200, types.GetPeoplePersonalInformationByIdResponse200>> {
    return this.core.fetch('/people/{worker_id}/personal', 'get', metadata);
  }

  /**
   * Update worker's personal information.
   *  **Token scopes**: `people:write`
   *
   * @summary Update personal information
   * @throws FetchError<400, types.UpdatePeoplePersonalInformationByIdResponse400> Operation failed.
   * @throws FetchError<401, types.UpdatePeoplePersonalInformationByIdResponse401> Operation failed.
   * @throws FetchError<403, types.UpdatePeoplePersonalInformationByIdResponse403> Operation failed.
   * @throws FetchError<404, types.UpdatePeoplePersonalInformationByIdResponse404> Operation failed.
   * @throws FetchError<500, types.UpdatePeoplePersonalInformationByIdResponse500> Operation failed.
   */
  updatePeoplePersonalInformationById(body: types.UpdatePeoplePersonalInformationByIdBodyParam, metadata: types.UpdatePeoplePersonalInformationByIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/people/{worker_id}/personal', 'patch', body, metadata);
  }

  /**
   * Amend the details of a contract. Please note that if the contract is already signed or
   * active, then the update will have to be approved and re-signed for to take effect.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Amend contract
   * @throws FetchError<400, types.AmendContractDetailsResponse400> Operation failed.
   * @throws FetchError<401, types.AmendContractDetailsResponse401> Operation failed.
   * @throws FetchError<403, types.AmendContractDetailsResponse403> Operation failed.
   * @throws FetchError<404, types.AmendContractDetailsResponse404> Operation failed.
   * @throws FetchError<500, types.AmendContractDetailsResponse500> Operation failed.
   */
  amendContractDetails(body: types.AmendContractDetailsBodyParam, metadata: types.AmendContractDetailsMetadataParam): Promise<FetchResponse<201, types.AmendContractDetailsResponse201>> {
    return this.core.fetch('/contracts/{contract_id}/amendments', 'post', body, metadata);
  }

  /**
   * Retrieve comprehensive hiring guide data for a specific country. This data can be used
   * in creation and validation of Employee of Record (EOR) contract quotes, providing
   * details on salaries, holidays, insurance, and other employment specifics.
   *  **Token scopes**: `contracts:read`
   *
   * @summary Retrieve detailed hiring guide for a country
   * @throws FetchError<400, types.GetEorCountryValidationsResponse400> Invalid request. The provided country code does not match the expected format.
   * @throws FetchError<401, types.GetEorCountryValidationsResponse401> Operation failed.
   * @throws FetchError<403, types.GetEorCountryValidationsResponse403> Operation failed.
   * @throws FetchError<404, types.GetEorCountryValidationsResponse404> Country data not found.
   * @throws FetchError<500, types.GetEorCountryValidationsResponse500> Operation failed.
   */
  getEorCountryValidations(metadata: types.GetEorCountryValidationsMetadataParam): Promise<FetchResponse<200, types.GetEorCountryValidationsResponse200>> {
    return this.core.fetch('/eor/validations/{country_code}', 'get', metadata);
  }

  /**
   * Activate the 401k integration for the legal entity
   *  **Token scopes**: `benefits:write`
   *
   * @summary Activate the 401k integration for the legal entity
   * @throws FetchError<400, types.CreateBenefitProviderIntegrationClientResponse400> Operation failed.
   * @throws FetchError<401, types.CreateBenefitProviderIntegrationClientResponse401> Operation failed.
   * @throws FetchError<403, types.CreateBenefitProviderIntegrationClientResponse403> Operation failed.
   * @throws FetchError<404, types.CreateBenefitProviderIntegrationClientResponse404> Operation failed.
   * @throws FetchError<500, types.CreateBenefitProviderIntegrationClientResponse500> Operation failed.
   */
  createBenefitProviderIntegrationClient(metadata: types.CreateBenefitProviderIntegrationClientMetadataParam): Promise<FetchResponse<200, types.CreateBenefitProviderIntegrationClientResponse200>> {
    return this.core.fetch('/benefits/legal-entities/{id}/benefits/401k/activate', 'post', metadata);
  }

  /**
   * Enable clients with group admin and people manager permissions to initiate a resignation
   * request for an Employee of Record (EOR) contract within their team.
   *  **Token scopes**: `contracts:read`, `contracts:write`
   *
   * @summary Request EOR Contract Resignation
   * @throws FetchError<400, types.EorResignationRequestResponse400> Operation failed.
   * @throws FetchError<401, types.EorResignationRequestResponse401> Unauthorized response
   * @throws FetchError<403, types.EorResignationRequestResponse403> Forbidden response
   * @throws FetchError<404, types.EorResignationRequestResponse404> Not Found response
   * @throws FetchError<500, types.EorResignationRequestResponse500> Operation failed.
   */
  eorResignationRequest(body: types.EorResignationRequestBodyParam, metadata: types.EorResignationRequestMetadataParam): Promise<FetchResponse<200, types.EorResignationRequestResponse200>> {
    return this.core.fetch('/eor/{oid}/terminations/resignation', 'post', body, metadata);
  }

  /**
   * List time-off requests
   *  **Token scopes**: `time-off:read`
   *
   * @summary List time-off requests
   * @throws FetchError<400, types.GetTimeOffsQueryResponse400> Operation failed.
   * @throws FetchError<401, types.GetTimeOffsQueryResponse401> Operation failed.
   * @throws FetchError<403, types.GetTimeOffsQueryResponse403> Operation failed.
   * @throws FetchError<404, types.GetTimeOffsQueryResponse404> Operation failed.
   * @throws FetchError<500, types.GetTimeOffsQueryResponse500> Operation failed.
   */
  getTimeOffsQuery(metadata: types.GetTimeOffsQueryMetadataParam): Promise<FetchResponse<200, types.GetTimeOffsQueryResponse200>> {
    return this.core.fetch('/time_offs/profile/{hris_profile_id}', 'get', metadata);
  }

  /**
   * Add a new bank account for an employee.
   *  **Token scopes**: `people:write`
   *
   * @summary Add bank account
   * @throws FetchError<400, types.AddGpBankAccountResponse400> Operation failed.
   * @throws FetchError<401, types.AddGpBankAccountResponse401> Operation failed.
   * @throws FetchError<403, types.AddGpBankAccountResponse403> Operation failed.
   * @throws FetchError<404, types.AddGpBankAccountResponse404> Operation failed.
   * @throws FetchError<500, types.AddGpBankAccountResponse500> Operation failed.
   */
  addGpBankAccount(body: types.AddGpBankAccountBodyParam, metadata: types.AddGpBankAccountMetadataParam): Promise<FetchResponse<201, types.AddGpBankAccountResponse201>> {
    return this.core.fetch('/gp/workers/{worker_id}/banks', 'post', body, metadata);
  }

  /**
   * Retrieve all bank accounts for an employee.
   *  **Token scopes**: `people:read`
   *
   * @summary Retrieve bank accounts
   * @throws FetchError<400, types.GetGpBankAccountsResponse400> Operation failed.
   * @throws FetchError<401, types.GetGpBankAccountsResponse401> Operation failed.
   * @throws FetchError<403, types.GetGpBankAccountsResponse403> Operation failed.
   * @throws FetchError<404, types.GetGpBankAccountsResponse404> Operation failed.
   * @throws FetchError<500, types.GetGpBankAccountsResponse500> Operation failed.
   */
  getGpBankAccounts(metadata: types.GetGpBankAccountsMetadataParam): Promise<FetchResponse<200, types.GetGpBankAccountsResponse200>> {
    return this.core.fetch('/gp/workers/{worker_id}/banks', 'get', metadata);
  }

  /**
   * Get year to date from employees from organization integrated with external benefits
   * vendor
   *  **Token scopes**: `organizations:read`
   *
   * @summary Get year to date payment for benefits 401k.
   * @throws FetchError<400, types.GetYearToDatePayResponse400> Operation failed.
   * @throws FetchError<401, types.GetYearToDatePayResponse401> Operation failed.
   * @throws FetchError<403, types.GetYearToDatePayResponse403> Operation failed.
   * @throws FetchError<404, types.GetYearToDatePayResponse404> Operation failed.
   * @throws FetchError<500, types.GetYearToDatePayResponse500> Operation failed.
   */
  getYearToDatePay(metadata: types.GetYearToDatePayMetadataParam): Promise<FetchResponse<200, types.GetYearToDatePayResponse200>> {
    return this.core.fetch('/benefits/legal-entities/{id}/year-to-date-pay', 'get', metadata);
  }

  /**
   * Get pay stub from employees from organization integrated with external benefits vendor
   *  **Token scopes**: `organizations:read`
   *
   * @summary Get pay stub from employees from organization integrated with external benefits vendor
   * @throws FetchError<400, types.GetPayStubResponse400> Operation failed.
   * @throws FetchError<401, types.GetPayStubResponse401> Operation failed.
   * @throws FetchError<403, types.GetPayStubResponse403> Operation failed.
   * @throws FetchError<404, types.GetPayStubResponse404> Operation failed.
   * @throws FetchError<500, types.GetPayStubResponse500> Operation failed.
   */
  getPayStub(metadata: types.GetPayStubMetadataParam): Promise<FetchResponse<200, types.GetPayStubResponse200>> {
    return this.core.fetch('/benefits/legal-entities/{id}/pay-stub', 'get', metadata);
  }

  /**
   * Retrieve hourly report presets for a given contract and work statement.
   *  **Token scopes**: `timesheets:read`
   *
   * @summary Get Hourly Report Presets
   * @throws FetchError<400, types.GetHourlyReportPresetsResponse400> Bad Request
   * @throws FetchError<401, types.GetHourlyReportPresetsResponse401> Operation failed.
   * @throws FetchError<403, types.GetHourlyReportPresetsResponse403> Operation failed.
   * @throws FetchError<404, types.GetHourlyReportPresetsResponse404> Operation failed.
   * @throws FetchError<500, types.GetHourlyReportPresetsResponse500> Operation failed.
   */
  getHourlyReportPresets(metadata: types.GetHourlyReportPresetsMetadataParam): Promise<FetchResponse<200, types.GetHourlyReportPresetsResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/timesheets/presets', 'get', metadata);
  }

  /**
   * This endpoint allows employees to formally request the termination of their EOR contract
   *  **Token scopes**: `contracts:read`, `contracts:write`
   *
   * @summary Request EOR Contract Resignation Made by Employee
   * @throws FetchError<400, types.ResignationRequestMadeByEmployeeResponse400> Operation failed.
   * @throws FetchError<401, types.ResignationRequestMadeByEmployeeResponse401> Unauthorized response
   * @throws FetchError<403, types.ResignationRequestMadeByEmployeeResponse403> Forbidden response
   * @throws FetchError<404, types.ResignationRequestMadeByEmployeeResponse404> Not Found response
   * @throws FetchError<500, types.ResignationRequestMadeByEmployeeResponse500> Operation failed.
   */
  resignationRequestMadeByEmployee(body: types.ResignationRequestMadeByEmployeeBodyParam, metadata: types.ResignationRequestMadeByEmployeeMetadataParam): Promise<FetchResponse<200, types.ResignationRequestMadeByEmployeeResponse200>> {
    return this.core.fetch('/eor/{oid}/terminations/resignation-by-employee', 'post', body, metadata);
  }

  /**
   * Create or update amendment
   *  **Token scopes**: `contracts:write`
   *
   * @summary Upsert amendment
   * @throws FetchError<400, types.UpsertAmendmentResponse400> Bad Request - Validation errors or disabled amendments.
   * @throws FetchError<401, types.UpsertAmendmentResponse401> Operation failed.
   * @throws FetchError<403, types.UpsertAmendmentResponse403> Operation failed.
   */
  upsertAmendment(body: types.UpsertAmendmentBodyParam, metadata: types.UpsertAmendmentMetadataParam): Promise<FetchResponse<200, types.UpsertAmendmentResponse200>>;
  upsertAmendment(metadata: types.UpsertAmendmentMetadataParam): Promise<FetchResponse<200, types.UpsertAmendmentResponse200>>;
  upsertAmendment(body?: types.UpsertAmendmentBodyParam | types.UpsertAmendmentMetadataParam, metadata?: types.UpsertAmendmentMetadataParam): Promise<FetchResponse<200, types.UpsertAmendmentResponse200>> {
    return this.core.fetch('/eor/amendments/{contract_oid}', 'post', body, metadata);
  }

  /**
   * Get all amendments for contact
   *  **Token scopes**: `contracts:read`
   *
   * @summary Get all amendments
   * @throws FetchError<401, types.GetAllAmendmentsResponse401> Operation failed.
   * @throws FetchError<403, types.GetAllAmendmentsResponse403> Operation failed.
   */
  getAllAmendments(metadata: types.GetAllAmendmentsMetadataParam): Promise<FetchResponse<200, types.GetAllAmendmentsResponse200>> {
    return this.core.fetch('/eor/amendments/{contract_oid}', 'get', metadata);
  }

  /**
   * Delete a worker relation by external id.
   *  **Token scopes**: `profile:write`
   *
   * @summary Delete a worker relation by external id
   * @throws FetchError<400, types.DeleteWorkerRelationExternalIdResponse400> Operation failed.
   * @throws FetchError<401, types.DeleteWorkerRelationExternalIdResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteWorkerRelationExternalIdResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteWorkerRelationExternalIdResponse404> Operation failed.
   * @throws FetchError<500, types.DeleteWorkerRelationExternalIdResponse500> Operation failed.
   */
  deleteWorkerRelationExternalId(metadata: types.DeleteWorkerRelationExternalIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/hris/worker_relations/profile/external/{profileId}', 'delete', metadata);
  }

  /**
   * Fetch Worker Relations of a given HrisProfile by external id.
   *  **Token scopes**: `profile:read`
   *
   * @summary Fetch Worker Relations of a given HrisProfile by external id
   * @throws FetchError<400, types.GetAllProfileWorkerRelationsExternalIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetAllProfileWorkerRelationsExternalIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetAllProfileWorkerRelationsExternalIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetAllProfileWorkerRelationsExternalIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetAllProfileWorkerRelationsExternalIdResponse500> Operation failed.
   */
  getAllProfileWorkerRelationsExternalId(metadata: types.GetAllProfileWorkerRelationsExternalIdMetadataParam): Promise<FetchResponse<200, types.GetAllProfileWorkerRelationsExternalIdResponse200>> {
    return this.core.fetch('/hris/worker_relations/profile/external/{profileId}', 'get', metadata);
  }

  /**
   * Lists employee additional info template by the contract type and the employment country
   *  **Token scopes**: `contracts:read`
   *
   * @summary Employee additional info template
   * @throws FetchError<400, types.EmployeeAdditionalInfoTemplateResponse400> Invalid country code or contract type.
   * @throws FetchError<401, types.EmployeeAdditionalInfoTemplateResponse401> Operation failed.
   * @throws FetchError<403, types.EmployeeAdditionalInfoTemplateResponse403> Operation failed.
   * @throws FetchError<404, types.EmployeeAdditionalInfoTemplateResponse404> Operation failed.
   * @throws FetchError<500, types.EmployeeAdditionalInfoTemplateResponse500> Operation failed.
   */
  employeeAdditionalInfoTemplate(metadata: types.EmployeeAdditionalInfoTemplateMetadataParam): Promise<FetchResponse<200, types.EmployeeAdditionalInfoTemplateResponse200>> {
    return this.core.fetch('/employee-info/contract-types/{type}/countries/{country}', 'get', metadata);
  }

  /**
   * Get employee from organization integrated with external benefits vendor
   *  **Token scopes**: `people:read`
   *
   * @summary Get employee from organization integrated with external benefits vendor
   * @throws FetchError<400, types.GetBenefitEmployeeResponse400> Operation failed.
   * @throws FetchError<401, types.GetBenefitEmployeeResponse401> Operation failed.
   * @throws FetchError<403, types.GetBenefitEmployeeResponse403> Operation failed.
   * @throws FetchError<404, types.GetBenefitEmployeeResponse404> Operation failed.
   * @throws FetchError<500, types.GetBenefitEmployeeResponse500> Operation failed.
   */
  getBenefitEmployee(metadata: types.GetBenefitEmployeeMetadataParam): Promise<FetchResponse<200, types.GetBenefitEmployeeResponse200>> {
    return this.core.fetch('/benefits/legal-entities/{id}/employees/{employee_id}', 'get', metadata);
  }

  /**
   * Get enrollment settings from an employee in a 401k plan
   *  **Token scopes**: `benefits:read`
   *
   * @summary Get enrollment settings from an employee in a 401k plan
   * @throws FetchError<400, types.Get401KEnrollmentsDefinitionResponse400> Operation failed.
   * @throws FetchError<401, types.Get401KEnrollmentsDefinitionResponse401> Operation failed.
   * @throws FetchError<403, types.Get401KEnrollmentsDefinitionResponse403> Operation failed.
   * @throws FetchError<404, types.Get401KEnrollmentsDefinitionResponse404> Operation failed.
   * @throws FetchError<500, types.Get401KEnrollmentsDefinitionResponse500> Operation failed.
   */
  get401kEnrollmentsDefinition(metadata: types.Get401KEnrollmentsDefinitionMetadataParam): Promise<FetchResponse<200, types.Get401KEnrollmentsDefinitionResponse200>> {
    return this.core.fetch('/benefits/legal-entities/{id}/contracts/{contract_id}/plans/{plan_id}', 'get', metadata);
  }

  /**
   * Delete enrollment settings from an employee in a 401k plan
   *  **Token scopes**: `benefits:write`
   *
   * @summary Delete enrollment settings from an employee in a 401k plan
   * @throws FetchError<400, types.Delete401KEnrollmentsDefinitionResponse400> Operation failed.
   * @throws FetchError<401, types.Delete401KEnrollmentsDefinitionResponse401> Operation failed.
   * @throws FetchError<403, types.Delete401KEnrollmentsDefinitionResponse403> Operation failed.
   * @throws FetchError<404, types.Delete401KEnrollmentsDefinitionResponse404> Operation failed.
   * @throws FetchError<500, types.Delete401KEnrollmentsDefinitionResponse500> Operation failed.
   */
  delete401kEnrollmentsDefinition(body: types.Delete401KEnrollmentsDefinitionBodyParam, metadata: types.Delete401KEnrollmentsDefinitionMetadataParam): Promise<FetchResponse<204, types.Delete401KEnrollmentsDefinitionResponse204>> {
    return this.core.fetch('/benefits/legal-entities/{id}/contracts/{contract_id}/plans/{plan_id}', 'delete', body, metadata);
  }

  /**
   * Change enrollment settings from an employee in a 401k plan
   *  **Token scopes**: `benefits:write`
   *
   * @summary Change enrollment settings from an employee in a 401k plan
   * @throws FetchError<400, types.Put401KEnrollmentsDefinitionResponse400> Operation failed.
   * @throws FetchError<401, types.Put401KEnrollmentsDefinitionResponse401> Operation failed.
   * @throws FetchError<403, types.Put401KEnrollmentsDefinitionResponse403> Operation failed.
   * @throws FetchError<404, types.Put401KEnrollmentsDefinitionResponse404> Operation failed.
   * @throws FetchError<500, types.Put401KEnrollmentsDefinitionResponse500> Operation failed.
   */
  put401kEnrollmentsDefinition(body: types.Put401KEnrollmentsDefinitionBodyParam, metadata: types.Put401KEnrollmentsDefinitionMetadataParam): Promise<FetchResponse<200, types.Put401KEnrollmentsDefinitionResponse200>> {
    return this.core.fetch('/benefits/legal-entities/{id}/contracts/{contract_id}/plans/{plan_id}', 'put', body, metadata);
  }

  /**
   * Enroll an employee in a 401k plan
   *  **Token scopes**: `benefits:write`
   *
   * @summary Enroll an employee in a 401k plan
   * @throws FetchError<400, types.Post401KEnrollmentsDefinitionResponse400> Operation failed.
   * @throws FetchError<401, types.Post401KEnrollmentsDefinitionResponse401> Operation failed.
   * @throws FetchError<403, types.Post401KEnrollmentsDefinitionResponse403> Operation failed.
   * @throws FetchError<404, types.Post401KEnrollmentsDefinitionResponse404> Operation failed.
   * @throws FetchError<500, types.Post401KEnrollmentsDefinitionResponse500> Operation failed.
   */
  post401kEnrollmentsDefinition(body: types.Post401KEnrollmentsDefinitionBodyParam, metadata: types.Post401KEnrollmentsDefinitionMetadataParam): Promise<FetchResponse<200, types.Post401KEnrollmentsDefinitionResponse200>> {
    return this.core.fetch('/benefits/legal-entities/{id}/contracts/{contract_id}/plans/{plan_id}', 'post', body, metadata);
  }

  /**
   * Retrieves detailed information about the organization's hierarchical structure,
   * including departments and teams.
   *  **Token scopes**: `organizations:read`
   *
   * @summary Get Organization Structure
   * @throws FetchError<400, types.GetAllOrgStructuresResponse400> Operation failed.
   * @throws FetchError<401, types.GetAllOrgStructuresResponse401> Operation failed.
   * @throws FetchError<403, types.GetAllOrgStructuresResponse403> Operation failed.
   * @throws FetchError<404, types.GetAllOrgStructuresResponse404> Operation failed.
   * @throws FetchError<500, types.GetAllOrgStructuresResponse500> Operation failed.
   */
  getAllOrgStructures(metadata?: types.GetAllOrgStructuresMetadataParam): Promise<FetchResponse<200, types.GetAllOrgStructuresResponse200>> {
    return this.core.fetch('/hris/organization_structures', 'get', metadata);
  }

  /**
   * Create a new HRIS Organization Structure.
   *  **Token scopes**: `organizations:write`
   *
   * @summary Create a new HRIS Organization Structure.
   * @throws FetchError<400, types.CreateOrgStructureResponse400> Operation failed.
   * @throws FetchError<401, types.CreateOrgStructureResponse401> Operation failed.
   * @throws FetchError<403, types.CreateOrgStructureResponse403> Operation failed.
   * @throws FetchError<404, types.CreateOrgStructureResponse404> Operation failed.
   * @throws FetchError<500, types.CreateOrgStructureResponse500> Operation failed.
   */
  createOrgStructure(body: types.CreateOrgStructureBodyParam): Promise<FetchResponse<200, types.CreateOrgStructureResponse200>> {
    return this.core.fetch('/hris/organization_structures', 'post', body);
  }

  /**
   * Get a link to download the invoice PDF.
   *  **Token scopes**: `accounting:read`
   *
   * @summary Download invoice PDF
   * @throws FetchError<400, types.GetBillingInvoiceDownloadLinkResponse400> Operation failed.
   * @throws FetchError<401, types.GetBillingInvoiceDownloadLinkResponse401> Operation failed.
   * @throws FetchError<403, types.GetBillingInvoiceDownloadLinkResponse403> Operation failed.
   * @throws FetchError<404, types.GetBillingInvoiceDownloadLinkResponse404> Operation failed.
   * @throws FetchError<500, types.GetBillingInvoiceDownloadLinkResponse500> Operation failed.
   */
  getBillingInvoiceDownloadLink(metadata: types.GetBillingInvoiceDownloadLinkMetadataParam): Promise<FetchResponse<200, types.GetBillingInvoiceDownloadLinkResponse200>> {
    return this.core.fetch('/invoices/{id}/download', 'get', metadata);
  }

  /**
   * Retrieves policy validation templates and policy types based on the provided countries.
   * Policy types are unique.
   *  **Token scopes**: `time-off:read`
   *
   * @summary Retrieve policy validation templates
   * @throws FetchError<400, types.RetrievePolicyValidationTemplatesResponse400> Operation failed.
   * @throws FetchError<401, types.RetrievePolicyValidationTemplatesResponse401> Operation failed.
   * @throws FetchError<403, types.RetrievePolicyValidationTemplatesResponse403> Operation failed.
   * @throws FetchError<404, types.RetrievePolicyValidationTemplatesResponse404> Operation failed.
   * @throws FetchError<500, types.RetrievePolicyValidationTemplatesResponse500> Operation failed.
   */
  retrievePolicyValidationTemplates(metadata: types.RetrievePolicyValidationTemplatesMetadataParam): Promise<FetchResponse<200, types.RetrievePolicyValidationTemplatesResponse200>> {
    return this.core.fetch('/time_offs/policy-validation-templates', 'get', metadata);
  }

  /**
   * Retrieve offboarding list
   *  **Token scopes**: `contracts:read`, `people:read`
   *
   * @summary Retrieve offboarding list
   * @throws FetchError<400, types.GetRetrieveOffboardingListResponse400> Operation failed.
   * @throws FetchError<401, types.GetRetrieveOffboardingListResponse401> Operation failed.
   * @throws FetchError<403, types.GetRetrieveOffboardingListResponse403> Operation failed.
   * @throws FetchError<404, types.GetRetrieveOffboardingListResponse404> Operation failed.
   * @throws FetchError<500, types.GetRetrieveOffboardingListResponse500> Operation failed.
   */
  getRetrieveOffboardingList(metadata?: types.GetRetrieveOffboardingListMetadataParam): Promise<FetchResponse<200, types.GetRetrieveOffboardingListResponse200>> {
    return this.core.fetch('/offboarding/tracker', 'get', metadata);
  }

  /**
   * Create a new 401k plan for existing provider to legal entity
   *  **Token scopes**: `benefits:write`
   *
   * @summary Create 401k plan for legal entity
   * @throws FetchError<400, types.Post401KPlansDefinitionResponse400> Operation failed.
   * @throws FetchError<401, types.Post401KPlansDefinitionResponse401> Operation failed.
   * @throws FetchError<403, types.Post401KPlansDefinitionResponse403> Operation failed.
   * @throws FetchError<404, types.Post401KPlansDefinitionResponse404> Operation failed.
   * @throws FetchError<500, types.Post401KPlansDefinitionResponse500> Operation failed.
   */
  post401kPlansDefinition(body: types.Post401KPlansDefinitionBodyParam, metadata: types.Post401KPlansDefinitionMetadataParam): Promise<FetchResponse<200, types.Post401KPlansDefinitionResponse200>> {
    return this.core.fetch('/benefits/legal-entities/{id}/401k/plans', 'post', body, metadata);
  }

  /**
   * Get 401k plans legal entity
   *  **Token scopes**: `benefits:read`
   *
   * @summary Get 401k plans for legal entity
   * @throws FetchError<400, types.Get401KPlansDefinitionResponse400> Operation failed.
   * @throws FetchError<401, types.Get401KPlansDefinitionResponse401> Operation failed.
   * @throws FetchError<403, types.Get401KPlansDefinitionResponse403> Operation failed.
   * @throws FetchError<404, types.Get401KPlansDefinitionResponse404> Operation failed.
   * @throws FetchError<500, types.Get401KPlansDefinitionResponse500> Operation failed.
   */
  get401kPlansDefinition(metadata: types.Get401KPlansDefinitionMetadataParam): Promise<FetchResponse<200, types.Get401KPlansDefinitionResponse200>> {
    return this.core.fetch('/benefits/legal-entities/{id}/401k/plans', 'get', metadata);
  }

  /**
   * Get worker's personal information by using an external identifier.
   *  **Token scopes**: `people:read`
   *
   * @summary Get personal information by external id
   * @throws FetchError<400, types.GetPeoplePersonalInformationByExternalIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetPeoplePersonalInformationByExternalIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetPeoplePersonalInformationByExternalIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetPeoplePersonalInformationByExternalIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetPeoplePersonalInformationByExternalIdResponse500> Operation failed.
   */
  getPeoplePersonalInformationByExternalId(metadata: types.GetPeoplePersonalInformationByExternalIdMetadataParam): Promise<FetchResponse<200, types.GetPeoplePersonalInformationByExternalIdResponse200>> {
    return this.core.fetch('/people/external/{worker_id}/personal', 'get', metadata);
  }

  /**
   * Update worker's personal information by using an external identifier.
   *  **Token scopes**: `people:write`
   *
   * @summary Update personal information by external id
   * @throws FetchError<400, types.UpdatePeoplePersonalInformationByExternalIdResponse400> Operation failed.
   * @throws FetchError<401, types.UpdatePeoplePersonalInformationByExternalIdResponse401> Operation failed.
   * @throws FetchError<403, types.UpdatePeoplePersonalInformationByExternalIdResponse403> Operation failed.
   * @throws FetchError<404, types.UpdatePeoplePersonalInformationByExternalIdResponse404> Operation failed.
   * @throws FetchError<500, types.UpdatePeoplePersonalInformationByExternalIdResponse500> Operation failed.
   */
  updatePeoplePersonalInformationByExternalId(body: types.UpdatePeoplePersonalInformationByExternalIdBodyParam, metadata: types.UpdatePeoplePersonalInformationByExternalIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/people/external/{worker_id}/personal', 'patch', body, metadata);
  }

  /**
   * Archive an existing group.
   *  **Token scopes**: `groups:write`
   *
   * @summary Delete a group
   * @throws FetchError<400, types.DeleteGroupResponse400> Bad request
   * @throws FetchError<401, types.DeleteGroupResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteGroupResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteGroupResponse404> Group not found
   * @throws FetchError<500, types.DeleteGroupResponse500> Operation failed.
   */
  deleteGroup(metadata: types.DeleteGroupMetadataParam): Promise<FetchResponse<200, types.DeleteGroupResponse200>> {
    return this.core.fetch('/groups/{id}', 'delete', metadata);
  }

  /**
   * Edit the details of an existing group.
   *  **Token scopes**: `groups:read`, `groups:write`
   *
   * @summary Edit a group
   * @throws FetchError<400, types.EditGroupResponse400> Invalid request payload
   * @throws FetchError<401, types.EditGroupResponse401> Operation failed.
   * @throws FetchError<403, types.EditGroupResponse403> Operation failed.
   * @throws FetchError<404, types.EditGroupResponse404> Operation failed.
   * @throws FetchError<500, types.EditGroupResponse500> Operation failed.
   */
  editGroup(body: types.EditGroupBodyParam, metadata: types.EditGroupMetadataParam): Promise<FetchResponse<200, types.EditGroupResponse200>> {
    return this.core.fetch('/groups/{id}', 'patch', body, metadata);
  }

  /**
   * Returns the basic information for an EOR contract, along with employment costs
   * associated to it
   *  **Token scopes**: `contracts:read`
   *
   * @summary Retrieve EOR Contract Details
   * @throws FetchError<400, types.RetrieveEorContractDetailsResponse400> Operation failed.
   * @throws FetchError<401, types.RetrieveEorContractDetailsResponse401> Operation failed.
   * @throws FetchError<403, types.RetrieveEorContractDetailsResponse403> Access denied
   * @throws FetchError<404, types.RetrieveEorContractDetailsResponse404> Operation failed.
   * @throws FetchError<500, types.RetrieveEorContractDetailsResponse500> Operation failed.
   */
  retrieveEorContractDetails(metadata: types.RetrieveEorContractDetailsMetadataParam): Promise<FetchResponse<200, types.RetrieveEorContractDetailsResponse200>> {
    return this.core.fetch('/eor/contracts/{contract_id}/details', 'get', metadata);
  }

  /**
   * Retrieve a list of payments made to Deel, including worker details, payment status, and
   * payment methods.
   *  **Token scopes**: `accounting:read`
   *
   * @summary Retrieve payment receipts
   * @throws FetchError<400, types.GetPaymentListResponse400> Operation failed.
   * @throws FetchError<401, types.GetPaymentListResponse401> Operation failed.
   * @throws FetchError<403, types.GetPaymentListResponse403> Operation failed.
   * @throws FetchError<404, types.GetPaymentListResponse404> Operation failed.
   * @throws FetchError<500, types.GetPaymentListResponse500> Operation failed.
   */
  getPaymentList(metadata?: types.GetPaymentListMetadataParam): Promise<FetchResponse<200, types.GetPaymentListResponse200>> {
    return this.core.fetch('/payments', 'get', metadata);
  }

  /**
   * This API enables clients with group admin and people manager permissions to initiate a
   * request for the termination of an Employee of Record (EOR) contract for members of their
   * team.
   *  **Token scopes**: `contracts:read`, `contracts:write`
   *
   * @summary Termination Request
   * @throws FetchError<400, types.EorTerminationRequestResponse400> Operation failed.
   * @throws FetchError<401, types.EorTerminationRequestResponse401> Unauthorized response
   * @throws FetchError<403, types.EorTerminationRequestResponse403> Forbidden response
   * @throws FetchError<404, types.EorTerminationRequestResponse404> Not Found response
   * @throws FetchError<500, types.EorTerminationRequestResponse500> Operation failed.
   */
  eorTerminationRequest(body: types.EorTerminationRequestBodyParam, metadata: types.EorTerminationRequestMetadataParam): Promise<FetchResponse<200, types.EorTerminationRequestResponse200>> {
    return this.core.fetch('/eor/{oid}/terminations/regular', 'post', body, metadata);
  }

  /**
   * Clean up plan for a given legal entity
   *  **Token scopes**: `benefits:write`
   *
   * @summary Clean up plan for a given legal entity
   * @throws FetchError<400, types.CleanUpPlanResponse400> Operation failed.
   * @throws FetchError<401, types.CleanUpPlanResponse401> Operation failed.
   * @throws FetchError<403, types.CleanUpPlanResponse403> Operation failed.
   * @throws FetchError<404, types.CleanUpPlanResponse404> Operation failed.
   * @throws FetchError<500, types.CleanUpPlanResponse500> Operation failed.
   */
  cleanUpPlan(metadata: types.CleanUpPlanMetadataParam): Promise<FetchResponse<202, types.CleanUpPlanResponse202>> {
    return this.core.fetch('/benefits/legal-entities/{id}/401k/plans/clean-up', 'post', metadata);
  }

  /**
   * Review multiple tasks associated with a Deel contract to approve or decline the
   * submitted work. The review includes a status (approved or declined) for each task and an
   * optional reason for declined tasks.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Review multiple tasks
   * @throws FetchError<400, types.CreateTaskManyReviewResponse400> Bad request. Missing required fields or invalid data format.
   * @throws FetchError<401, types.CreateTaskManyReviewResponse401> Unauthorized. Authentication credentials are missing or invalid.
   * @throws FetchError<403, types.CreateTaskManyReviewResponse403> Operation failed.
   * @throws FetchError<404, types.CreateTaskManyReviewResponse404> Not found. One or more specified tasks or the contract was not found.
   * @throws FetchError<500, types.CreateTaskManyReviewResponse500> Internal server error. An unexpected error occurred while processing the request.
   */
  createTaskManyReview(body: types.CreateTaskManyReviewBodyParam, metadata: types.CreateTaskManyReviewMetadataParam): Promise<FetchResponse<201, types.CreateTaskManyReviewResponse201>> {
    return this.core.fetch('/contracts/{contract_id}/tasks/many/reviews', 'post', body, metadata);
  }

  /**
   * List background checks by contract.
   *  **Token scopes**: `contracts:read`
   *
   * @summary List background checks by contract
   * @throws FetchError<400, types.GetBackgroundChecksByContractIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetBackgroundChecksByContractIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetBackgroundChecksByContractIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetBackgroundChecksByContractIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetBackgroundChecksByContractIdResponse500> Operation failed.
   */
  getBackgroundChecksByContractId(metadata: types.GetBackgroundChecksByContractIdMetadataParam): Promise<FetchResponse<200, types.GetBackgroundChecksByContractIdResponse200>> {
    return this.core.fetch('/background-checks/{contract_id}', 'get', metadata);
  }

  /**
   * Returns a list of predefined job scope templates for an EOR contract, which can be
   * filtered by team. The list includes both predefined and custom job scope templates
   * belonging to the user's teams.
   *  **Token scopes**: `organizations:read`
   *
   * @summary List of job scope templates for EOR contracts
   * @throws FetchError<400, types.ListOfJobScopeTemplatesForEorContractsResponse400> Operation failed.
   * @throws FetchError<401, types.ListOfJobScopeTemplatesForEorContractsResponse401> Operation failed.
   * @throws FetchError<403, types.ListOfJobScopeTemplatesForEorContractsResponse403> Operation failed.
   * @throws FetchError<404, types.ListOfJobScopeTemplatesForEorContractsResponse404> Not Found - Organization not linked to profile or no teams found for the organization
   * @throws FetchError<500, types.ListOfJobScopeTemplatesForEorContractsResponse500> Operation failed.
   */
  listOfJobScopeTemplatesForEorContracts(metadata?: types.ListOfJobScopeTemplatesForEorContractsMetadataParam): Promise<FetchResponse<200, types.ListOfJobScopeTemplatesForEorContractsResponse200>> {
    return this.core.fetch('/eor/job-scopes', 'get', metadata);
  }

  /**
   * List time-off entitlements.
   *  **Token scopes**: `time-off:read`
   *
   * @summary Get Profile Entitlements
   * @throws FetchError<400, types.GetProfileEntitlementsResponse400> Operation failed.
   * @throws FetchError<401, types.GetProfileEntitlementsResponse401> Operation failed.
   * @throws FetchError<403, types.GetProfileEntitlementsResponse403> Operation failed.
   * @throws FetchError<404, types.GetProfileEntitlementsResponse404> Operation failed.
   * @throws FetchError<500, types.GetProfileEntitlementsResponse500> Operation failed.
   */
  getProfileEntitlements(metadata: types.GetProfileEntitlementsMetadataParam): Promise<FetchResponse<200, types.GetProfileEntitlementsResponse200>> {
    return this.core.fetch('/time_offs/profile/{hris_profile_id}/entitlements', 'get', metadata);
  }

  /**
   * Retrieve a list of timesheets found for a contract.
   *  **Token scopes**: `timesheets:read`
   *
   * @summary List of timesheets by contract
   * @throws FetchError<400, types.GetTimesheetsByContractResponse400> Operation failed.
   * @throws FetchError<401, types.GetTimesheetsByContractResponse401> Operation failed.
   * @throws FetchError<403, types.GetTimesheetsByContractResponse403> Operation failed.
   * @throws FetchError<404, types.GetTimesheetsByContractResponse404> Operation failed.
   * @throws FetchError<500, types.GetTimesheetsByContractResponse500> Operation failed.
   */
  getTimesheetsByContract(metadata: types.GetTimesheetsByContractMetadataParam): Promise<FetchResponse<200, types.GetTimesheetsByContractResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/timesheets', 'get', metadata);
  }

  /**
   * Retrieve a list of pre-defined job titles in Deel platform.
   *
   * @summary Job titles list
   * @throws FetchError<400, types.GetJobTitleListResponse400> Operation failed.
   * @throws FetchError<401, types.GetJobTitleListResponse401> Operation failed.
   * @throws FetchError<403, types.GetJobTitleListResponse403> Operation failed.
   * @throws FetchError<404, types.GetJobTitleListResponse404> Operation failed.
   * @throws FetchError<500, types.GetJobTitleListResponse500> Operation failed.
   */
  getJobTitleList(metadata?: types.GetJobTitleListMetadataParam): Promise<FetchResponse<200, types.GetJobTitleListResponse200>> {
    return this.core.fetch('/lookups/job-titles', 'get', metadata);
  }

  /**
   * Review a specific task associated with a Deel contract to approve or decline the
   * submitted work. The review includes the status (approved or declined) and an optional
   * reason if declined.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Review a single task
   * @throws FetchError<400, types.CreateTaskReviewByIdResponse400> Bad request. Missing required fields or invalid data format.
   * @throws FetchError<401, types.CreateTaskReviewByIdResponse401> Unauthorized. Authentication credentials are missing or invalid.
   * @throws FetchError<403, types.CreateTaskReviewByIdResponse403> Operation failed.
   * @throws FetchError<404, types.CreateTaskReviewByIdResponse404> Not found. The specified task or contract was not found.
   * @throws FetchError<500, types.CreateTaskReviewByIdResponse500> Internal server error. An unexpected error occurred while processing the request.
   */
  createTaskReviewById(body: types.CreateTaskReviewByIdBodyParam, metadata: types.CreateTaskReviewByIdMetadataParam): Promise<FetchResponse<201, types.CreateTaskReviewByIdResponse201>> {
    return this.core.fetch('/contracts/{contract_id}/tasks/{task_id}/reviews', 'post', body, metadata);
  }

  /**
   * Fetch detailed information about benefits associated with a specific Employee of Record
   * (EOR) contract. The benefits include plan details, provider information, and enrollment
   * statuses.
   *  **Token scopes**: `contracts:read`
   *
   * @summary Retrieve Benefits for EOR Contract
   * @throws FetchError<400, types.GetEorContractBenefitsResponse400> Invalid request. The `contract_id` parameter is missing or improperly formatted.
   * @throws FetchError<401, types.GetEorContractBenefitsResponse401> Operation failed.
   * @throws FetchError<403, types.GetEorContractBenefitsResponse403> Operation failed.
   * @throws FetchError<404, types.GetEorContractBenefitsResponse404> The specified contract ID does not exist or has no associated benefits.
   * @throws FetchError<500, types.GetEorContractBenefitsResponse500> Operation failed.
   */
  getEORContractBenefits(metadata: types.GetEorContractBenefitsMetadataParam): Promise<FetchResponse<200, types.GetEorContractBenefitsResponse200>> {
    return this.core.fetch('/eor/{contract_id}/benefits', 'get', metadata);
  }

  /**
   * Get invite link generated for worker
   *  **Token scopes**: `contracts:read`
   *
   * @summary Get worker invite link
   * @throws FetchError<400, types.GetInviteLinkResponse400> Operation failed.
   * @throws FetchError<401, types.GetInviteLinkResponse401> Operation failed.
   * @throws FetchError<403, types.GetInviteLinkResponse403> Operation failed.
   * @throws FetchError<404, types.GetInviteLinkResponse404> Operation failed.
   * @throws FetchError<500, types.GetInviteLinkResponse500> Operation failed.
   */
  getInviteLink(metadata: types.GetInviteLinkMetadataParam): Promise<FetchResponse<200, types.GetInviteLinkResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/invite', 'get', metadata);
  }

  /**
   * This endpoint allows client to validate job scope description.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Request job scope validation
   * @throws FetchError<400, types.RequestjobScopeValidationResponse400> Operation failed.
   * @throws FetchError<401, types.RequestjobScopeValidationResponse401> Operation failed.
   * @throws FetchError<403, types.RequestjobScopeValidationResponse403> Operation failed.
   * @throws FetchError<404, types.RequestjobScopeValidationResponse404> Operation failed.
   * @throws FetchError<500, types.RequestjobScopeValidationResponse500> Operation failed.
   */
  requestjobScopeValidation(body: types.RequestjobScopeValidationBodyParam): Promise<FetchResponse<201, types.RequestjobScopeValidationResponse201>> {
    return this.core.fetch('/eor/job-scopes/validate', 'post', body);
  }

  /**
   * undefined
   *  **Token scopes**: `people:write`
   *
   * @summary Update working location
   * @throws FetchError<400, types.UpdatePeopleWorkingLocationResponse400> Operation failed.
   * @throws FetchError<401, types.UpdatePeopleWorkingLocationResponse401> Operation failed.
   * @throws FetchError<403, types.UpdatePeopleWorkingLocationResponse403> Operation failed.
   * @throws FetchError<404, types.UpdatePeopleWorkingLocationResponse404> Operation failed.
   * @throws FetchError<500, types.UpdatePeopleWorkingLocationResponse500> Operation failed.
   */
  updatePeopleWorkingLocation(body: types.UpdatePeopleWorkingLocationBodyParam, metadata: types.UpdatePeopleWorkingLocationMetadataParam): Promise<FetchResponse<200, types.UpdatePeopleWorkingLocationResponse200>> {
    return this.core.fetch('/people/{id}/working-location', 'put', body, metadata);
  }

  /**
   * Get paystubs from legal entity integrated with external benefits vendor
   *  **Token scopes**: `benefits:read`
   *
   * @summary Get paystubs from legal entity integrated with external benefits vendor
   * @throws FetchError<400, types.GetBenefitPaystubsResponse400> Operation failed.
   * @throws FetchError<401, types.GetBenefitPaystubsResponse401> Operation failed.
   * @throws FetchError<403, types.GetBenefitPaystubsResponse403> Operation failed.
   * @throws FetchError<404, types.GetBenefitPaystubsResponse404> Operation failed.
   * @throws FetchError<500, types.GetBenefitPaystubsResponse500> Operation failed.
   */
  getBenefitPaystubs(metadata: types.GetBenefitPaystubsMetadataParam): Promise<FetchResponse<200, types.GetBenefitPaystubsResponse200>> {
    return this.core.fetch('/benefits/legal-entities/{legalEntityId}/paystubs', 'get', metadata);
  }

  /**
   * Retrieve a list of teams within the organization associated with the authenticated user.
   * This list provides basic details about each team, including the team ID and name.
   *  **Token scopes**: `organizations:read`
   *
   * @summary Get Team List
   * @throws FetchError<400, types.GetTeamsResponse400> Operation failed.
   * @throws FetchError<401, types.GetTeamsResponse401> Unauthorized. The request is missing authentication credentials or the credentials
   * provided are invalid.
   * @throws FetchError<403, types.GetTeamsResponse403> Operation failed.
   * @throws FetchError<404, types.GetTeamsResponse404> No teams found. There are no teams associated with the current organization.
   * @throws FetchError<500, types.GetTeamsResponse500> Internal server error. An error occurred on the server while processing the request.
   */
  getTeams(): Promise<FetchResponse<200, types.GetTeamsResponse200>> {
    return this.core.fetch('/teams', 'get');
  }

  /**
   * Retrieve a list of invoices related to Deel fees.
   *  **Token scopes**: `accounting:read`
   *
   * @summary Retrieve Deel invoices
   * @throws FetchError<400, types.RetrieveDeelInvoicesResponse400> Operation failed.
   * @throws FetchError<401, types.RetrieveDeelInvoicesResponse401> Operation failed.
   * @throws FetchError<403, types.RetrieveDeelInvoicesResponse403> Operation failed.
   * @throws FetchError<404, types.RetrieveDeelInvoicesResponse404> Operation failed.
   * @throws FetchError<500, types.RetrieveDeelInvoicesResponse500> Operation failed.
   */
  retrieveDeelInvoices(metadata?: types.RetrieveDeelInvoicesMetadataParam): Promise<FetchResponse<200, types.RetrieveDeelInvoicesResponse200>> {
    return this.core.fetch('/invoices/deel', 'get', metadata);
  }

  /**
   * Determine the total employment costs for an Employee of Record (EOR) arrangement across
   * different countries, including salary, employer costs, benefits, and additional fees.
   *
   * @summary Calculate Employee Costs Globally
   * @throws FetchError<400, types.CalculateEorEmploymentCostResponse400> Invalid request. Some required fields are missing or invalid.
   * @throws FetchError<401, types.CalculateEorEmploymentCostResponse401> Operation failed.
   * @throws FetchError<403, types.CalculateEorEmploymentCostResponse403> Operation failed.
   * @throws FetchError<404, types.CalculateEorEmploymentCostResponse404> Operation failed.
   * @throws FetchError<500, types.CalculateEorEmploymentCostResponse500> Internal server error. Something went wrong while calculating costs.
   */
  calculateEorEmploymentCost(body: types.CalculateEorEmploymentCostBodyParam): Promise<FetchResponse<200, types.CalculateEorEmploymentCostResponse200>> {
    return this.core.fetch('/eor/employment_cost', 'post', body);
  }

  /**
   * Retrieve the bank form guide for an employee.
   *  **Token scopes**: `people:read`
   *
   * @summary Retrieve bank guide
   * @throws FetchError<400, types.GetGpBankGuideResponse400> Operation failed.
   * @throws FetchError<401, types.GetGpBankGuideResponse401> Operation failed.
   * @throws FetchError<403, types.GetGpBankGuideResponse403> Operation failed.
   * @throws FetchError<404, types.GetGpBankGuideResponse404> Operation failed.
   * @throws FetchError<500, types.GetGpBankGuideResponse500> Operation failed.
   */
  getGpBankGuide(metadata: types.GetGpBankGuideMetadataParam): Promise<FetchResponse<200, types.GetGpBankGuideResponse200>> {
    return this.core.fetch('/gp/workers/{worker_id}/banks/guide', 'get', metadata);
  }

  /**
   * Download global payroll reports detailing gross-to-net calculations.
   *  **Token scopes**: `global-payroll:read`
   *
   * @summary Download gross to net report
   * @throws FetchError<400, types.DownloadGrossToNetReportResponse400> Operation failed.
   * @throws FetchError<401, types.DownloadGrossToNetReportResponse401> Operation failed.
   * @throws FetchError<403, types.DownloadGrossToNetReportResponse403> Operation failed.
   * @throws FetchError<404, types.DownloadGrossToNetReportResponse404> Operation failed.
   * @throws FetchError<500, types.DownloadGrossToNetReportResponse500> Operation failed.
   */
  downloadGrossToNetReport(metadata: types.DownloadGrossToNetReportMetadataParam): Promise<FetchResponse<200, types.DownloadGrossToNetReportResponse200>> {
    return this.core.fetch('/gp/reports/{id}/gross_to_net/csv', 'get', metadata);
  }

  /**
   * List policies
   *  **Token scopes**: `time-off:read`
   *
   * @summary List policies
   * @throws FetchError<400, types.GetPoliciesForProfileResponse400> Operation failed.
   * @throws FetchError<401, types.GetPoliciesForProfileResponse401> Operation failed.
   * @throws FetchError<403, types.GetPoliciesForProfileResponse403> Operation failed.
   * @throws FetchError<404, types.GetPoliciesForProfileResponse404> Operation failed.
   * @throws FetchError<500, types.GetPoliciesForProfileResponse500> Operation failed.
   */
  getPoliciesForProfile(metadata: types.GetPoliciesForProfileMetadataParam): Promise<FetchResponse<200, types.GetPoliciesForProfileResponse200>> {
    return this.core.fetch('/time_offs/profile/{hris_profile_id}/policies', 'get', metadata);
  }

  /**
   * Retrieve the current user's profile.
   *  **Token scopes**: `people:read`, `worker:read`
   *
   * @summary Get my current personal profile
   * @throws FetchError<400, types.GetPeopleResponse400> Operation failed.
   * @throws FetchError<401, types.GetPeopleResponse401> Operation failed.
   * @throws FetchError<403, types.GetPeopleResponse403> Operation failed.
   * @throws FetchError<404, types.GetPeopleResponse404> Operation failed.
   * @throws FetchError<500, types.GetPeopleResponse500> Operation failed.
   */
  getPeople(): Promise<FetchResponse<200, types.GetPeopleResponse200>> {
    return this.core.fetch('/people/me', 'get');
  }

  /**
   * Get a list of global payroll events by legal entities.
   *  **Token scopes**: `global-payroll:read`
   *
   * @summary List payroll events by legal entity
   * @throws FetchError<400, types.GetGpLegalEntitiesResponse400> Operation failed.
   * @throws FetchError<401, types.GetGpLegalEntitiesResponse401> Operation failed.
   * @throws FetchError<403, types.GetGpLegalEntitiesResponse403> Operation failed.
   * @throws FetchError<404, types.GetGpLegalEntitiesResponse404> Operation failed.
   * @throws FetchError<500, types.GetGpLegalEntitiesResponse500> Operation failed.
   */
  getGPLegalEntities(metadata: types.GetGpLegalEntitiesMetadataParam): Promise<FetchResponse<200, types.GetGpLegalEntitiesResponse200>> {
    return this.core.fetch('/gp/legal-entities/{id}/reports', 'get', metadata);
  }

  /**
   * Create employee hired under your own entity to Deel's HRIS. Manage your employee through
   * Deel and export a payroll report to your own providers.
   *  **Token scopes**: `people:write`
   *
   * @summary Create a direct employee
   * @throws FetchError<400, types.CreateDirectEmployeeResponse400> Operation failed.
   * @throws FetchError<401, types.CreateDirectEmployeeResponse401> Operation failed.
   * @throws FetchError<403, types.CreateDirectEmployeeResponse403> Operation failed.
   * @throws FetchError<404, types.CreateDirectEmployeeResponse404> Operation failed.
   * @throws FetchError<500, types.CreateDirectEmployeeResponse500> Operation failed.
   */
  createDirectEmployee(body: types.CreateDirectEmployeeBodyParam): Promise<FetchResponse<201, types.CreateDirectEmployeeResponse201>> {
    return this.core.fetch('/people', 'post', body);
  }

  /**
   * Retrieve a list of People in your organization.
   *  **Token scopes**: `people:read`
   *
   * @summary List of people
   * @throws FetchError<400, types.GetPeopleListResponse400> Operation failed.
   * @throws FetchError<401, types.GetPeopleListResponse401> Operation failed.
   * @throws FetchError<403, types.GetPeopleListResponse403> Operation failed.
   * @throws FetchError<404, types.GetPeopleListResponse404> Operation failed.
   * @throws FetchError<500, types.GetPeopleListResponse500> Operation failed.
   */
  getPeopleList(metadata?: types.GetPeopleListMetadataParam): Promise<FetchResponse<200, types.GetPeopleListResponse200>> {
    return this.core.fetch('/people', 'get', metadata);
  }

  /**
   * Retrieve an EOR job offer letter in HTML. This endpoint does not support IC and Global
   * Payroll contract types.
   *  **Token scopes**: `worker:read`
   *
   * @summary Preview job offer letter
   * @throws FetchError<400, types.GetDaasOfferLetterPreviewResponse400> Operation failed.
   * @throws FetchError<401, types.GetDaasOfferLetterPreviewResponse401> Operation failed.
   * @throws FetchError<403, types.GetDaasOfferLetterPreviewResponse403> Operation failed.
   * @throws FetchError<404, types.GetDaasOfferLetterPreviewResponse404> Operation failed.
   * @throws FetchError<500, types.GetDaasOfferLetterPreviewResponse500> Operation failed.
   */
  getDaasOfferLetterPreview(metadata: types.GetDaasOfferLetterPreviewMetadataParam): Promise<FetchResponse<200, types.GetDaasOfferLetterPreviewResponse200>> {
    return this.core.fetch('/eor/workers/contracts/{contract_id}/offer-letter', 'get', metadata);
  }

  /**
   * View information about amendment
   *  **Token scopes**: `contracts:read`
   *
   * @summary View information about amendment
   * @throws FetchError<401, types.ViewInformationAboutAmendmentResponse401> Operation failed.
   * @throws FetchError<403, types.ViewInformationAboutAmendmentResponse403> Operation failed.
   */
  viewInformationAboutAmendment(metadata: types.ViewInformationAboutAmendmentMetadataParam): Promise<FetchResponse<200, types.ViewInformationAboutAmendmentResponse200>> {
    return this.core.fetch('/eor/amendments/{contract_oid}/{amendment_flow_id}', 'get', metadata);
  }

  /**
   * Cancel amendment
   *  **Token scopes**: `contracts:write`
   *
   * @summary Cancel amendment
   * @throws FetchError<401, types.CancelAmendmentResponse401> Operation failed.
   * @throws FetchError<403, types.CancelAmendmentResponse403> Operation failed.
   */
  cancelAmendment(metadata: types.CancelAmendmentMetadataParam): Promise<FetchResponse<200, types.CancelAmendmentResponse200>> {
    return this.core.fetch('/eor/amendments/{contract_oid}/{amendment_flow_id}', 'delete', metadata);
  }

  /**
   * Sign a contract as a employee.
   *  **Token scopes**: `worker:write`
   *
   * @summary Sign a contract
   * @throws FetchError<400, types.DaasSignEmployeeContractResponse400> Operation failed.
   * @throws FetchError<401, types.DaasSignEmployeeContractResponse401> Operation failed.
   * @throws FetchError<403, types.DaasSignEmployeeContractResponse403> Operation failed.
   * @throws FetchError<404, types.DaasSignEmployeeContractResponse404> Operation failed.
   * @throws FetchError<500, types.DaasSignEmployeeContractResponse500> Operation failed.
   */
  daasSignEmployeeContract(body: types.DaasSignEmployeeContractBodyParam, metadata: types.DaasSignEmployeeContractMetadataParam): Promise<FetchResponse<201, types.DaasSignEmployeeContractResponse201>> {
    return this.core.fetch('/eor/workers/contracts/{contract_id}/signatures', 'post', body, metadata);
  }

  /**
   * Modify bank account for an employee.
   *  **Token scopes**: `people:write`
   *
   * @summary Modify bank account
   * @throws FetchError<400, types.PatchGpBankAccountResponse400> Operation failed.
   * @throws FetchError<401, types.PatchGpBankAccountResponse401> Operation failed.
   * @throws FetchError<403, types.PatchGpBankAccountResponse403> Operation failed.
   * @throws FetchError<404, types.PatchGpBankAccountResponse404> Operation failed.
   * @throws FetchError<500, types.PatchGpBankAccountResponse500> Operation failed.
   */
  patchGpBankAccount(body: types.PatchGpBankAccountBodyParam, metadata: types.PatchGpBankAccountMetadataParam): Promise<FetchResponse<200, types.PatchGpBankAccountResponse200>> {
    return this.core.fetch('/gp/workers/{worker_id}/banks/{bank_id}', 'patch', body, metadata);
  }

  /**
   * Get onboarding overview
   *  **Token scopes**: `contracts:read`, `people:read`
   *
   * @summary Get onboarding details by onboarding hris profile oid
   * @throws FetchError<400, types.GetOnboardingOverviewResponse400> Operation failed.
   * @throws FetchError<401, types.GetOnboardingOverviewResponse401> Operation failed.
   * @throws FetchError<403, types.GetOnboardingOverviewResponse403> Operation failed.
   * @throws FetchError<404, types.GetOnboardingOverviewResponse404> Operation failed.
   * @throws FetchError<500, types.GetOnboardingOverviewResponse500> Operation failed.
   */
  getOnboardingOverview(metadata: types.GetOnboardingOverviewMetadataParam): Promise<FetchResponse<200, types.GetOnboardingOverviewResponse200>> {
    return this.core.fetch('/onboarding/tracker/hris_profile/{oid}', 'get', metadata);
  }

  /**
   * Approve/Reject time-off requests in batch. The request body should contain a list of
   * time-off IDs and the desired status (either APPROVED or REJECTED). The response will
   * indicate which requests were successfully processed and which ones encountered...
   *  **Token scopes**: `time-off:write`
   *
   * @summary Approve/Reject time-off requests
   * @throws FetchError<400, types.ApproveRejectTimeOffRequestsResponse400> Operation failed.
   * @throws FetchError<401, types.ApproveRejectTimeOffRequestsResponse401> Operation failed.
   * @throws FetchError<403, types.ApproveRejectTimeOffRequestsResponse403> Operation failed.
   * @throws FetchError<404, types.ApproveRejectTimeOffRequestsResponse404> Operation failed.
   * @throws FetchError<500, types.ApproveRejectTimeOffRequestsResponse500> Operation failed.
   */
  approveRejectTimeOffRequests(body: types.ApproveRejectTimeOffRequestsBodyParam): Promise<FetchResponse<200, types.ApproveRejectTimeOffRequestsResponse200>> {
    return this.core.fetch('/time_offs/review', 'post', body);
  }

  /**
   * Retrieve a single person in your organization.
   *  **Token scopes**: `people:read`
   *
   * @summary Retrieve a single person
   * @throws FetchError<400, types.GetPeopleByIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetPeopleByIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetPeopleByIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetPeopleByIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetPeopleByIdResponse500> Operation failed.
   */
  getPeopleById(metadata: types.GetPeopleByIdMetadataParam): Promise<FetchResponse<200, types.GetPeopleByIdResponse200>> {
    return this.core.fetch('/people/{hrisProfileOid}', 'get', metadata);
  }

  /**
   * Update time-off request
   *  **Token scopes**: `time-off:write`
   *
   * @summary Update time-off request
   * @throws FetchError<400, types.UpdateTimeOffResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateTimeOffResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateTimeOffResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateTimeOffResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateTimeOffResponse500> Operation failed.
   */
  updateTimeOff(body: types.UpdateTimeOffBodyParam, metadata: types.UpdateTimeOffMetadataParam): Promise<FetchResponse<200, types.UpdateTimeOffResponse200>> {
    return this.core.fetch('/time_offs/{time_off_id}', 'patch', body, metadata);
  }

  /**
   * Delete time-off request
   *  **Token scopes**: `time-off:write`
   *
   * @summary Delete time-off request
   * @throws FetchError<400, types.DeleteTimeOffResponse400> Operation failed.
   * @throws FetchError<401, types.DeleteTimeOffResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteTimeOffResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteTimeOffResponse404> Operation failed.
   * @throws FetchError<500, types.DeleteTimeOffResponse500> Operation failed.
   */
  deleteTimeOff(metadata: types.DeleteTimeOffMetadataParam): Promise<FetchResponse<204, types.DeleteTimeOffResponse204>> {
    return this.core.fetch('/time_offs/{time_off_id}', 'delete', metadata);
  }

  /**
   * Returns a formulary for creating EOR Contracts
   *  **Token scopes**: `forms:read`
   *
   * @summary Fetch EOR Contract form
   * @throws FetchError<400, types.FetchEorContractFormResponse400> Operation failed.
   * @throws FetchError<401, types.FetchEorContractFormResponse401> Operation failed.
   * @throws FetchError<403, types.FetchEorContractFormResponse403> Operation failed.
   * @throws FetchError<404, types.FetchEorContractFormResponse404> Operation failed.
   * @throws FetchError<500, types.FetchEorContractFormResponse500> Operation failed.
   */
  fetchEorContractForm(metadata: types.FetchEorContractFormMetadataParam): Promise<FetchResponse<200, types.FetchEorContractFormResponse200>> {
    return this.core.fetch('/forms/eor/create-contract/{country_code}', 'get', metadata);
  }

  /**
   * Retrieve a list of legal entities in your account.
   *  **Token scopes**: `organizations:read`, `accounting:read`
   *
   * @summary List of legal entities
   * @throws FetchError<400, types.GetLegalEntityListResponse400> Operation failed.
   * @throws FetchError<401, types.GetLegalEntityListResponse401> Operation failed.
   * @throws FetchError<403, types.GetLegalEntityListResponse403> Operation failed.
   * @throws FetchError<404, types.GetLegalEntityListResponse404> Operation failed.
   * @throws FetchError<500, types.GetLegalEntityListResponse500> Operation failed.
   */
  getLegalEntityList(metadata?: types.GetLegalEntityListMetadataParam): Promise<FetchResponse<200, types.GetLegalEntityListResponse200>> {
    return this.core.fetch('/legal-entities', 'get', metadata);
  }

  /**
   * Create a new legal entity under an organization.
   *  **Token scopes**: `legal-entity:write`, `legal-entity:read`
   *
   * @summary Create a new legal entity
   * @throws FetchError<400, types.CreateLegalEntityResponse400> Invalid request parameters.
   * @throws FetchError<401, types.CreateLegalEntityResponse401> Operation failed.
   * @throws FetchError<403, types.CreateLegalEntityResponse403> Permission denied. User must have the `entities.manage` permission.
   * @throws FetchError<404, types.CreateLegalEntityResponse404> Operation failed.
   * @throws FetchError<500, types.CreateLegalEntityResponse500> Operation failed.
   */
  createLegalEntity(body?: types.CreateLegalEntityBodyParam): Promise<FetchResponse<200, types.CreateLegalEntityResponse200>> {
    return this.core.fetch('/legal-entities', 'post', body);
  }

  /**
   * Get link to download PDF (valid for 15min)
   *  **Token scopes**: `contracts:read`
   *
   * @summary Get link to download PDF (client and employee side)
   * @throws FetchError<401, types.DownloadPdfClientAndEmployeeSideResponse401> Operation failed.
   * @throws FetchError<403, types.DownloadPdfClientAndEmployeeSideResponse403> Operation failed.
   */
  downloadPdfClientAndEmployeeSide(metadata: types.DownloadPdfClientAndEmployeeSideMetadataParam): Promise<FetchResponse<200, types.DownloadPdfClientAndEmployeeSideResponse200>> {
    return this.core.fetch('/eor/amendments/{contract_oid}/{amendment_flow_id}/pdf', 'get', metadata);
  }

  /**
   * Confirm existing amendment, send for Deel and employee review
   *  **Token scopes**: `contracts:write`
   *
   * @summary Confirm amendment
   * @throws FetchError<401, types.ConfirmAmendmentResponse401> Operation failed.
   * @throws FetchError<403, types.ConfirmAmendmentResponse403> Operation failed.
   */
  confirmAmendment(metadata: types.ConfirmAmendmentMetadataParam): Promise<FetchResponse<200, types.ConfirmAmendmentResponse200>> {
    return this.core.fetch('/eor/amendments/{contract_oid}/{amendment_flow_id}/actions/confirm', 'post', metadata);
  }

  /**
   * List all HR verification letters and documents available.
   *  **Token scopes**: `worker:read`
   *
   * @summary List HR verification letters and documents
   * @throws FetchError<400, types.GetDaasHrVerificationLettersAndDocumentsResponse400> Operation failed.
   * @throws FetchError<401, types.GetDaasHrVerificationLettersAndDocumentsResponse401> Operation failed.
   * @throws FetchError<403, types.GetDaasHrVerificationLettersAndDocumentsResponse403> Operation failed.
   * @throws FetchError<404, types.GetDaasHrVerificationLettersAndDocumentsResponse404> Operation failed.
   * @throws FetchError<500, types.GetDaasHrVerificationLettersAndDocumentsResponse500> Operation failed.
   */
  getDaasHrVerificationLettersAndDocuments(metadata: types.GetDaasHrVerificationLettersAndDocumentsMetadataParam): Promise<FetchResponse<200, types.GetDaasHrVerificationLettersAndDocumentsResponse200>> {
    return this.core.fetch('/daas/contracts/{contract_id}/hr-documents', 'get', metadata);
  }

  /**
   * Get a list of employee compliance documents.
   *  **Token scopes**: `worker:read`
   *
   * @summary List of employee compliance documents
   * @throws FetchError<400, types.GetEorEmployeeComplianceDocumentsResponse400> Operation failed.
   * @throws FetchError<401, types.GetEorEmployeeComplianceDocumentsResponse401> Operation failed.
   * @throws FetchError<403, types.GetEorEmployeeComplianceDocumentsResponse403> Operation failed.
   * @throws FetchError<404, types.GetEorEmployeeComplianceDocumentsResponse404> Operation failed.
   * @throws FetchError<500, types.GetEorEmployeeComplianceDocumentsResponse500> Operation failed.
   */
  getEorEmployeeComplianceDocuments(): Promise<FetchResponse<200, types.GetEorEmployeeComplianceDocumentsResponse200>> {
    return this.core.fetch('/eor/workers/compliance-documents', 'get');
  }

  /**
   * Upload compliance document for an EOR employee.
   *  **Token scopes**: `worker:write`
   *
   * @summary Upload employee compliance document
   * @throws FetchError<400, types.UploadEmployeeComplianceDocumentResponse400> Operation failed.
   * @throws FetchError<401, types.UploadEmployeeComplianceDocumentResponse401> Operation failed.
   * @throws FetchError<403, types.UploadEmployeeComplianceDocumentResponse403> Operation failed.
   * @throws FetchError<404, types.UploadEmployeeComplianceDocumentResponse404> Operation failed.
   * @throws FetchError<500, types.UploadEmployeeComplianceDocumentResponse500> Operation failed.
   */
  uploadEmployeeComplianceDocument(body: types.UploadEmployeeComplianceDocumentBodyParam, metadata: types.UploadEmployeeComplianceDocumentMetadataParam): Promise<FetchResponse<200, types.UploadEmployeeComplianceDocumentResponse200>> {
    return this.core.fetch('/eor/workers/compliance-documents/{document_id}', 'post', body, metadata);
  }

  /**
   * Retrieve details of the current organization associated with the authenticated user. The
   * organization is automatically detected based on the authentication token provided in the
   * request.
   *  **Token scopes**: `organizations:read`
   *
   * @summary Get Current Organization
   * @throws FetchError<400, types.GetOrganizationsResponse400> Operation failed.
   * @throws FetchError<401, types.GetOrganizationsResponse401> Unauthorized. The request is missing authentication credentials or the credentials
   * provided are invalid.
   * @throws FetchError<403, types.GetOrganizationsResponse403> Operation failed.
   * @throws FetchError<404, types.GetOrganizationsResponse404> Organization not found. The current organization associated with the authentication
   * token could not be found.
   * @throws FetchError<500, types.GetOrganizationsResponse500> Internal server error. An error occurred on the server while processing the request.
   */
  getOrganizations(): Promise<FetchResponse<200, types.GetOrganizationsResponse200>> {
    return this.core.fetch('/organizations', 'get');
  }

  /**
   * Get all bank transfer supported routes for specific contractor.
   *  **Token scopes**: `worker:read`, `worker:write`
   *
   * @summary Get bank transfer supported routes for contractor
   * @throws FetchError<400, types.GetBankTransferSupportedRoutesResponse400> Operation failed.
   * @throws FetchError<401, types.GetBankTransferSupportedRoutesResponse401> Operation failed.
   * @throws FetchError<403, types.GetBankTransferSupportedRoutesResponse403> Operation failed.
   * @throws FetchError<404, types.GetBankTransferSupportedRoutesResponse404> Operation failed.
   * @throws FetchError<500, types.GetBankTransferSupportedRoutesResponse500> Operation failed.
   */
  getBankTransferSupportedRoutes(): Promise<FetchResponse<200, types.GetBankTransferSupportedRoutesResponse200>> {
    return this.core.fetch('/payouts/contractors/methods/bank_transfers/supported_routes', 'get');
  }

  /**
   * Get the validations of available data points
   *  **Token scopes**: `contracts:read`
   *
   * @summary Get the validations
   * @throws FetchError<401, types.GetTheValidationsResponse401> Operation failed.
   * @throws FetchError<403, types.GetTheValidationsResponse403> Operation failed.
   */
  getTheValidations(metadata: types.GetTheValidationsMetadataParam): Promise<FetchResponse<200, types.GetTheValidationsResponse200>> {
    return this.core.fetch('/eor/amendments/{contract_oid}/amendment-settings', 'get', metadata);
  }

  /**
   * Apply add, edit, and delete operations to profiles.
   *  **Token scopes**: `profile:write`
   *
   * @summary Apply changes to positions.
   * @throws FetchError<403, types.ApplyChangesPositionsResponse403> Operation failed.
   * @throws FetchError<404, types.ApplyChangesPositionsResponse404> Operation failed.
   */
  applyChangesPositions(body: types.ApplyChangesPositionsBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/hris/positions/apply_changes', 'post', body);
  }

  /**
   * Get organization working locations.
   *  **Token scopes**: `organizations:read`
   *
   * @summary Retrieve working locations
   * @throws FetchError<400, types.RetrieveWorkingLocationsResponse400> Operation failed.
   * @throws FetchError<401, types.RetrieveWorkingLocationsResponse401> Operation failed.
   * @throws FetchError<403, types.RetrieveWorkingLocationsResponse403> Operation failed.
   * @throws FetchError<404, types.RetrieveWorkingLocationsResponse404> Operation failed.
   * @throws FetchError<500, types.RetrieveWorkingLocationsResponse500> Operation failed.
   */
  retrieveWorkingLocations(): Promise<FetchResponse<200, types.RetrieveWorkingLocationsResponse200>> {
    return this.core.fetch('/working-locations', 'get');
  }

  /**
   * Retrieve the consent for the authenticated user or organization.
   *
   * @summary Get integration consent
   * @throws FetchError<400, types.GetConsentResponse400> Operation failed.
   * @throws FetchError<401, types.GetConsentResponse401> Operation failed.
   * @throws FetchError<403, types.GetConsentResponse403> Operation failed.
   * @throws FetchError<404, types.GetConsentResponse404> Operation failed.
   * @throws FetchError<500, types.GetConsentResponse500> Operation failed.
   */
  getConsent(): Promise<FetchResponse<200, types.GetConsentResponse200>> {
    return this.core.fetch('/integrations/consent', 'get');
  }

  /**
   * Sign amendment (employee)
   *  **Token scopes**: `contracts:write`
   *
   * @summary Sign amendment (employee)
   * @throws FetchError<401, types.AcceptAmendmentEmployeeResponse401> Operation failed.
   * @throws FetchError<403, types.AcceptAmendmentEmployeeResponse403> Operation failed.
   */
  acceptAmendmentEmployee(metadata: types.AcceptAmendmentEmployeeMetadataParam): Promise<FetchResponse<200, types.AcceptAmendmentEmployeeResponse200>> {
    return this.core.fetch('/eor/amendments/{contract_oid}/{amendment_flow_id}/actions/sign', 'post', metadata);
  }

  /**
   * Download employee agreement PDF
   *  **Token scopes**: `worker:read`
   *
   * @summary Download employee agreement PDF
   * @throws FetchError<400, types.DownloadEmployeeAgreementPdfResponse400> Operation failed.
   * @throws FetchError<401, types.DownloadEmployeeAgreementPdfResponse401> Operation failed.
   * @throws FetchError<403, types.DownloadEmployeeAgreementPdfResponse403> Operation failed.
   * @throws FetchError<404, types.DownloadEmployeeAgreementPdfResponse404> Operation failed.
   * @throws FetchError<500, types.DownloadEmployeeAgreementPdfResponse500> Operation failed.
   */
  downloadEmployeeAgreementPdf(metadata: types.DownloadEmployeeAgreementPdfMetadataParam): Promise<FetchResponse<200, types.DownloadEmployeeAgreementPdfResponse200>> {
    return this.core.fetch('/eor/workers/contracts/{contract_id}/employee-agreement/download', 'get', metadata);
  }

  /**
   * Accept amendment (client)
   *  **Token scopes**: `contracts:write`
   *
   * @summary Accept amendment (client)
   * @throws FetchError<401, types.AcceptAmendmentClientResponse401> Operation failed.
   * @throws FetchError<403, types.AcceptAmendmentClientResponse403> Operation failed.
   */
  acceptAmendmentClient(metadata: types.AcceptAmendmentClientMetadataParam): Promise<FetchResponse<200, types.AcceptAmendmentClientResponse200>> {
    return this.core.fetch('/eor/amendments/{contract_oid}/{amendment_flow_id}/actions/accept', 'post', metadata);
  }

  /**
   * Get a list of payslips for an employee.
   *  **Token scopes**: `payslips:read`
   *
   * @summary Retrieve employee payslips
   * @throws FetchError<400, types.GetWorkerPayslipsResponse400> Operation failed.
   * @throws FetchError<401, types.GetWorkerPayslipsResponse401> Operation failed.
   * @throws FetchError<403, types.GetWorkerPayslipsResponse403> Operation failed.
   * @throws FetchError<404, types.GetWorkerPayslipsResponse404> Operation failed.
   * @throws FetchError<500, types.GetWorkerPayslipsResponse500> Operation failed.
   */
  getWorkerPayslips(metadata: types.GetWorkerPayslipsMetadataParam): Promise<FetchResponse<200, types.GetWorkerPayslipsResponse200>> {
    return this.core.fetch('/gp/workers/{id}/payslips', 'get', metadata);
  }

  /**
   * Retrieve a specific hourly report root preset by its ID.
   *  **Token scopes**: `timesheets:read`
   *
   * @summary Get Hourly Report Root Preset by ID
   * @throws FetchError<400, types.GetHourlyReportRootPresetByIdResponse400> Bad Request
   * @throws FetchError<401, types.GetHourlyReportRootPresetByIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetHourlyReportRootPresetByIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetHourlyReportRootPresetByIdResponse404> Not Found
   * @throws FetchError<500, types.GetHourlyReportRootPresetByIdResponse500> Operation failed.
   */
  getHourlyReportRootPresetById(metadata: types.GetHourlyReportRootPresetByIdMetadataParam): Promise<FetchResponse<200, types.GetHourlyReportRootPresetByIdResponse200>> {
    return this.core.fetch('/timesheets/root-presets/{id}', 'get', metadata);
  }

  /**
   * Get a list of global payroll reports detailing gross-to-net calculations. Supports
   * pagination through limit and offset query parameters.
   *  **Token scopes**: `global-payroll:read`
   *
   * @summary List gross-to-net report.
   * @throws FetchError<400, types.GetGrossToNetGpReportsResponse400> Operation failed.
   * @throws FetchError<401, types.GetGrossToNetGpReportsResponse401> Operation failed.
   * @throws FetchError<403, types.GetGrossToNetGpReportsResponse403> Operation failed.
   * @throws FetchError<404, types.GetGrossToNetGpReportsResponse404> Operation failed.
   * @throws FetchError<500, types.GetGrossToNetGpReportsResponse500> Operation failed.
   */
  getGrossToNetGPReports(metadata: types.GetGrossToNetGpReportsMetadataParam): Promise<FetchResponse<200, types.GetGrossToNetGpReportsResponse200>> {
    return this.core.fetch('/gp/reports/{id}/gross_to_net', 'get', metadata);
  }

  /**
   * Creates a bank transfer method with dynamic payload properties based on the selected
   * option.
   *  **Token scopes**: `worker:read`, `worker:write`
   *
   * @summary Create a bank transfer method
   * @throws FetchError<400, types.CreateBankTransferMethodResponse400> Operation failed.
   * @throws FetchError<401, types.CreateBankTransferMethodResponse401> Operation failed.
   * @throws FetchError<403, types.CreateBankTransferMethodResponse403> Operation failed.
   * @throws FetchError<404, types.CreateBankTransferMethodResponse404> Operation failed.
   * @throws FetchError<500, types.CreateBankTransferMethodResponse500> Operation failed.
   */
  createBankTransferMethod(body: types.CreateBankTransferMethodBodyParam): Promise<FetchResponse<201, types.CreateBankTransferMethodResponse201>> {
    return this.core.fetch('/payouts/contractors/methods', 'post', body);
  }

  /**
   * Retrieves all payout methods associated with the current user or account. Supports
   * filtering by default method status.
   *  **Token scopes**: `worker:read`, `worker:write`
   *
   * @summary Fetch all payout methods
   * @throws FetchError<400, types.GetPayoutMethodsResponse400> Operation failed.
   * @throws FetchError<401, types.GetPayoutMethodsResponse401> Operation failed.
   * @throws FetchError<403, types.GetPayoutMethodsResponse403> Operation failed.
   * @throws FetchError<404, types.GetPayoutMethodsResponse404> Operation failed.
   * @throws FetchError<500, types.GetPayoutMethodsResponse500> Operation failed.
   */
  getPayoutMethods(metadata?: types.GetPayoutMethodsMetadataParam): Promise<FetchResponse<200, types.GetPayoutMethodsResponse200>> {
    return this.core.fetch('/payouts/contractors/methods', 'get', metadata);
  }

  /**
   * Retrieve invoice adjustments. You can filter the list by providing additional parameters
   * e.g. contract_id, contract_type etc.
   *  **Token scopes**: `invoice-adjustments:read`
   *
   * @summary List invoice adjustments
   * @throws FetchError<400, types.GetInvoiceAdjustmentsResponse400> Operation failed.
   * @throws FetchError<401, types.GetInvoiceAdjustmentsResponse401> Operation failed.
   * @throws FetchError<403, types.GetInvoiceAdjustmentsResponse403> Operation failed.
   * @throws FetchError<404, types.GetInvoiceAdjustmentsResponse404> Operation failed.
   * @throws FetchError<500, types.GetInvoiceAdjustmentsResponse500> Operation failed.
   */
  getInvoiceAdjustments(metadata?: types.GetInvoiceAdjustmentsMetadataParam): Promise<FetchResponse<200, types.GetInvoiceAdjustmentsResponse200>> {
    return this.core.fetch('/invoice-adjustments', 'get', metadata);
  }

  /**
   * Create an invoice adjustment using this endpoint. For example, you can add a bonus,
   * commission, VAT %, deduction etc. to an invoice.
   *  **Token scopes**: `invoice-adjustments:write`
   *
   * @summary Create an invoice adjustment
   * @throws FetchError<400, types.CreateInvoiceAdjustmentResponse400> Operation failed.
   * @throws FetchError<401, types.CreateInvoiceAdjustmentResponse401> Operation failed.
   * @throws FetchError<403, types.CreateInvoiceAdjustmentResponse403> Operation failed.
   * @throws FetchError<404, types.CreateInvoiceAdjustmentResponse404> Operation failed.
   * @throws FetchError<500, types.CreateInvoiceAdjustmentResponse500> Operation failed.
   */
  createInvoiceAdjustment(body: types.CreateInvoiceAdjustmentBodyParam, metadata?: types.CreateInvoiceAdjustmentMetadataParam): Promise<FetchResponse<201, types.CreateInvoiceAdjustmentResponse201>> {
    return this.core.fetch('/invoice-adjustments', 'post', body, metadata);
  }

  /**
   * Fetch immigration case details by case id
   *  **Token scopes**: `immigration:read`
   *
   * @summary Immigration case details
   * @throws FetchError<400, types.ImmigrationCaseDetailsResponse400> Operation failed.
   * @throws FetchError<401, types.ImmigrationCaseDetailsResponse401> Operation failed.
   * @throws FetchError<403, types.ImmigrationCaseDetailsResponse403> Operation failed.
   * @throws FetchError<404, types.ImmigrationCaseDetailsResponse404> Operation failed.
   * @throws FetchError<500, types.ImmigrationCaseDetailsResponse500> Operation failed.
   */
  immigrationCaseDetails(metadata: types.ImmigrationCaseDetailsMetadataParam): Promise<FetchResponse<200, types.ImmigrationCaseDetailsResponse200>> {
    return this.core.fetch('/immigration/client/cases/{id}', 'get', metadata);
  }

  /**
   * Update a worker relation type.
   *  **Token scopes**: `organizations:write`
   *
   * @summary Update a worker relation type
   * @throws FetchError<400, types.UpdateWorkerRelationTypeResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateWorkerRelationTypeResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateWorkerRelationTypeResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateWorkerRelationTypeResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateWorkerRelationTypeResponse500> Operation failed.
   */
  updateWorkerRelationType(body: types.UpdateWorkerRelationTypeBodyParam, metadata: types.UpdateWorkerRelationTypeMetadataParam): Promise<FetchResponse<204, types.UpdateWorkerRelationTypeResponse204>> {
    return this.core.fetch('/hris/worker_relations/types/{typeId}', 'patch', body, metadata);
  }

  /**
   * Delete a worker relation type.
   *  **Token scopes**: `organizations:write`
   *
   * @summary Delete a worker relation type
   * @throws FetchError<400, types.DeleteWorkerRelationTypeResponse400> Operation failed.
   * @throws FetchError<401, types.DeleteWorkerRelationTypeResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteWorkerRelationTypeResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteWorkerRelationTypeResponse404> Operation failed.
   * @throws FetchError<500, types.DeleteWorkerRelationTypeResponse500> Operation failed.
   */
  deleteWorkerRelationType(metadata: types.DeleteWorkerRelationTypeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/hris/worker_relations/types/{typeId}', 'delete', metadata);
  }

  /**
   * Terminate contract.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Terminate contract
   * @throws FetchError<400, types.TerminateContractResponse400> Operation failed.
   * @throws FetchError<401, types.TerminateContractResponse401> Operation failed.
   * @throws FetchError<403, types.TerminateContractResponse403> Operation failed.
   * @throws FetchError<404, types.TerminateContractResponse404> Operation failed.
   * @throws FetchError<500, types.TerminateContractResponse500> Operation failed.
   */
  terminateContract(body: types.TerminateContractBodyParam, metadata: types.TerminateContractMetadataParam): Promise<FetchResponse<201, types.TerminateContractResponse201>> {
    return this.core.fetch('/contracts/{contractId}/terminations', 'post', body, metadata);
  }

  /**
   * Get employees from organization integrated with external benefits vendor
   *  **Token scopes**: `people:read`
   *
   * @summary Get employees from organization integrated with external benefits vendor
   * @throws FetchError<400, types.GetBenefitEmployeesResponse400> Operation failed.
   * @throws FetchError<401, types.GetBenefitEmployeesResponse401> Operation failed.
   * @throws FetchError<403, types.GetBenefitEmployeesResponse403> Operation failed.
   * @throws FetchError<404, types.GetBenefitEmployeesResponse404> Operation failed.
   * @throws FetchError<500, types.GetBenefitEmployeesResponse500> Operation failed.
   */
  getBenefitEmployees(metadata: types.GetBenefitEmployeesMetadataParam): Promise<FetchResponse<200, types.GetBenefitEmployeesResponse200>> {
    return this.core.fetch('/benefits/legal-entities/{id}/employees', 'get', metadata);
  }

  /**
   * Fetches a collection of contract templates available within your organization. Use this
   * endpoint to retrieve metadata about the templates.
   *  **Token scopes**: `contracts:read`
   *
   * @summary Retrieve contract templates
   * @throws FetchError<400, types.GetContractTemplatesResponse400> Invalid request parameters.
   * @throws FetchError<401, types.GetContractTemplatesResponse401> Operation failed.
   * @throws FetchError<403, types.GetContractTemplatesResponse403> Operation failed.
   * @throws FetchError<404, types.GetContractTemplatesResponse404> Operation failed.
   * @throws FetchError<500, types.GetContractTemplatesResponse500> Internal server error.
   */
  getContractTemplates(): Promise<FetchResponse<200, types.GetContractTemplatesResponse200>> {
    return this.core.fetch('/contract-templates', 'get');
  }

  /**
   * Add a candidate to Deel.
   *  **Token scopes**: `candidates:write`
   *
   * @summary Add Candidate
   * @throws FetchError<400, types.AddCandidateResponse400> Operation failed.
   * @throws FetchError<401, types.AddCandidateResponse401> Operation failed.
   * @throws FetchError<403, types.AddCandidateResponse403> Operation failed.
   * @throws FetchError<404, types.AddCandidateResponse404> Operation failed.
   * @throws FetchError<500, types.AddCandidateResponse500> Operation failed.
   */
  addCandidate(body: types.AddCandidateBodyParam): Promise<FetchResponse<201, types.AddCandidateResponse201>> {
    return this.core.fetch('/candidates', 'post', body);
  }

  /**
   * Archive a legal entity. This marks the entity as inactive but does not permanently
   * remove it.
   *  **Token scopes**: `legal-entity:read`, `legal-entity:write`
   *
   * @summary Delete a legal entity
   * @throws FetchError<400, types.DeleteLegalEntityResponse400> Invalid request parameters.
   * @throws FetchError<401, types.DeleteLegalEntityResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteLegalEntityResponse403> Permission denied.
   * @throws FetchError<404, types.DeleteLegalEntityResponse404> Operation failed.
   * @throws FetchError<500, types.DeleteLegalEntityResponse500> Operation failed.
   */
  deleteLegalEntity(metadata: types.DeleteLegalEntityMetadataParam): Promise<FetchResponse<200, types.DeleteLegalEntityResponse200>> {
    return this.core.fetch('/legal-entities/{id}', 'delete', metadata);
  }

  /**
   * Update the details of an existing legal entity.
   *  **Token scopes**: `legal-entity:read`, `legal-entity:write`
   *
   * @summary Edit a legal entity
   * @throws FetchError<400, types.EditLegalEntityResponse400> Invalid request parameters.
   * @throws FetchError<401, types.EditLegalEntityResponse401> Operation failed.
   * @throws FetchError<403, types.EditLegalEntityResponse403> Permission denied.
   * @throws FetchError<404, types.EditLegalEntityResponse404> Operation failed.
   * @throws FetchError<500, types.EditLegalEntityResponse500> Operation failed.
   */
  editLegalEntity(body: types.EditLegalEntityBodyParam, metadata: types.EditLegalEntityMetadataParam): Promise<FetchResponse<200, types.EditLegalEntityResponse200>> {
    return this.core.fetch('/legal-entities/{id}', 'patch', body, metadata);
  }

  /**
   * Invite a worker to sign the contract. Worker will be notified via email
   *  **Token scopes**: `contracts:write`
   *
   * @summary Send contract to worker
   * @throws FetchError<400, types.InviteToSignContractResponse400> Operation failed.
   * @throws FetchError<401, types.InviteToSignContractResponse401> Operation failed.
   * @throws FetchError<403, types.InviteToSignContractResponse403> Operation failed.
   * @throws FetchError<404, types.InviteToSignContractResponse404> Operation failed.
   * @throws FetchError<500, types.InviteToSignContractResponse500> Operation failed.
   */
  inviteToSignContract(body: types.InviteToSignContractBodyParam, metadata: types.InviteToSignContractMetadataParam): Promise<FetchResponse<201, types.InviteToSignContractResponse201>> {
    return this.core.fetch('/contracts/{contract_id}/invitations', 'post', body, metadata);
  }

  /**
   * Remove invite in order to re-invite a worker to sign the contract
   *  **Token scopes**: `contracts:write`
   *
   * @summary Remove invite
   * @throws FetchError<400, types.UninviteToSignContractResponse400> Operation failed.
   * @throws FetchError<401, types.UninviteToSignContractResponse401> Operation failed.
   * @throws FetchError<403, types.UninviteToSignContractResponse403> Operation failed.
   * @throws FetchError<404, types.UninviteToSignContractResponse404> Operation failed.
   * @throws FetchError<500, types.UninviteToSignContractResponse500> Operation failed.
   */
  uninviteToSignContract(metadata: types.UninviteToSignContractMetadataParam): Promise<FetchResponse<200, types.UninviteToSignContractResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/invitations', 'delete', metadata);
  }

  /**
   * Validate data points that require external validation
   *  **Token scopes**: `contracts:write`
   *
   * @summary Validate data points
   * @throws FetchError<401, types.ValidateDataPointsResponse401> Operation failed.
   * @throws FetchError<403, types.ValidateDataPointsResponse403> Operation failed.
   */
  validateDataPoints(body: types.ValidateDataPointsBodyParam, metadata: types.ValidateDataPointsMetadataParam): Promise<FetchResponse<200, types.ValidateDataPointsResponse200>> {
    return this.core.fetch('/eor/amendments/{contract_oid}/validate', 'post', body, metadata);
  }

  /**
   * Validate time-off requests and updates
   *  **Token scopes**: `time-off:read`
   *
   * @summary Validate time-off request
   * @throws FetchError<400, types.ValidateTimeOffRequestResponse400> Operation failed.
   * @throws FetchError<401, types.ValidateTimeOffRequestResponse401> Operation failed.
   * @throws FetchError<403, types.ValidateTimeOffRequestResponse403> Operation failed.
   * @throws FetchError<404, types.ValidateTimeOffRequestResponse404> Operation failed.
   * @throws FetchError<500, types.ValidateTimeOffRequestResponse500> Operation failed.
   */
  validateTimeOffRequest(body: types.ValidateTimeOffRequestBodyParam): Promise<FetchResponse<200, types.ValidateTimeOffRequestResponse200>> {
    return this.core.fetch('/time_offs/validate', 'post', body);
  }

  /**
   * Removes the custom field value from the contract custom field.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Delete Contract custom field by Id
   * @throws FetchError<400, types.DeleteContractCustomFieldResponse400> Operation failed.
   * @throws FetchError<401, types.DeleteContractCustomFieldResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteContractCustomFieldResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteContractCustomFieldResponse404> Operation failed.
   * @throws FetchError<500, types.DeleteContractCustomFieldResponse500> Operation failed.
   */
  deleteContractCustomField(metadata: types.DeleteContractCustomFieldMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/contracts/{contract_id}/custom_fields/{id}', 'delete', metadata);
  }

  /**
   * Retrieve a list of predefined time-off types that can be registered in the Deel
   * platform.
   *
   * @summary Retrieve Time-Off Types
   * @throws FetchError<400, types.GetTimeoffTypeListResponse400> Operation failed.
   * @throws FetchError<401, types.GetTimeoffTypeListResponse401> Operation failed.
   * @throws FetchError<403, types.GetTimeoffTypeListResponse403> Operation failed.
   * @throws FetchError<404, types.GetTimeoffTypeListResponse404> Operation failed.
   * @throws FetchError<500, types.GetTimeoffTypeListResponse500> Operation failed.
   */
  getTimeoffTypeList(): Promise<FetchResponse<200, types.GetTimeoffTypeListResponse200>> {
    return this.core.fetch('/lookups/time-off-types', 'get');
  }

  /**
   * Given a date range (start date, end date) gets the holidays, work schedule and time off
   * dailies for a list of hrisProfileIds or countries.
   *  **Token scopes**: `time-off:read`
   *
   * @summary Get Work Schedule and Holidays
   * @throws FetchError<400, types.GetWorkScheduleAndHolidaysResponse400> Operation failed.
   * @throws FetchError<401, types.GetWorkScheduleAndHolidaysResponse401> Operation failed.
   * @throws FetchError<403, types.GetWorkScheduleAndHolidaysResponse403> Operation failed.
   * @throws FetchError<404, types.GetWorkScheduleAndHolidaysResponse404> Operation failed.
   * @throws FetchError<500, types.GetWorkScheduleAndHolidaysResponse500> Operation failed.
   */
  getWorkScheduleAndHolidays(metadata?: types.GetWorkScheduleAndHolidaysMetadataParam): Promise<FetchResponse<200, types.GetWorkScheduleAndHolidaysResponse200>> {
    return this.core.fetch('/time_offs/dailies', 'get', metadata);
  }

  /**
   * Get list of additional properties for EOR worker account
   *  **Token scopes**: `forms:read`
   *
   * @summary Get worker additional fields for (EOR)
   * @throws FetchError<400, types.GetWorkerAdditionalFieldsForEorResponse400> Operation failed.
   * @throws FetchError<401, types.GetWorkerAdditionalFieldsForEorResponse401> Operation failed.
   * @throws FetchError<403, types.GetWorkerAdditionalFieldsForEorResponse403> Operation failed.
   * @throws FetchError<404, types.GetWorkerAdditionalFieldsForEorResponse404> Operation failed.
   * @throws FetchError<500, types.GetWorkerAdditionalFieldsForEorResponse500> Operation failed.
   */
  getWorkerAdditionalFieldsForEor(metadata: types.GetWorkerAdditionalFieldsForEorMetadataParam): Promise<FetchResponse<200, types.GetWorkerAdditionalFieldsForEorResponse200>> {
    return this.core.fetch('/forms/eor/worker-additional-fields/{country_code}', 'get', metadata);
  }

  /**
   * Create Veriff session
   *  **Token scopes**: `screenings:write`, `worker:write`
   *
   * @summary Create Veriff session
   * @throws FetchError<400, types.CreateVeriffSessionResponse400> Operation failed.
   * @throws FetchError<401, types.CreateVeriffSessionResponse401> Operation failed.
   * @throws FetchError<403, types.CreateVeriffSessionResponse403> Operation failed.
   * @throws FetchError<404, types.CreateVeriffSessionResponse404> Operation failed.
   * @throws FetchError<500, types.CreateVeriffSessionResponse500> Operation failed.
   */
  createVeriffSession(body: types.CreateVeriffSessionBodyParam): Promise<FetchResponse<201, types.CreateVeriffSessionResponse201>> {
    return this.core.fetch('/veriff/session', 'post', body);
  }

  /**
   * Attach a file to contract document.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Attach a file to contract
   * @throws FetchError<400, types.AddContractDocumentResponse400> Operation failed.
   * @throws FetchError<401, types.AddContractDocumentResponse401> Operation failed.
   * @throws FetchError<403, types.AddContractDocumentResponse403> Operation failed.
   * @throws FetchError<404, types.AddContractDocumentResponse404> Operation failed.
   * @throws FetchError<500, types.AddContractDocumentResponse500> Operation failed.
   */
  addContractDocument(body: types.AddContractDocumentBodyParam, metadata: types.AddContractDocumentMetadataParam): Promise<FetchResponse<201, types.AddContractDocumentResponse201>>;
  addContractDocument(metadata: types.AddContractDocumentMetadataParam): Promise<FetchResponse<201, types.AddContractDocumentResponse201>>;
  addContractDocument(body?: types.AddContractDocumentBodyParam | types.AddContractDocumentMetadataParam, metadata?: types.AddContractDocumentMetadataParam): Promise<FetchResponse<201, types.AddContractDocumentResponse201>> {
    return this.core.fetch('/contracts/{contract_id}/documents', 'post', body, metadata);
  }

  /**
   * Updates auto withdraw setting for contractor
   *  **Token scopes**: `worker:read`, `worker:write`
   *
   * @summary Update auto withdraw setting for contractor
   * @throws FetchError<400, types.UpdateAutoWithdrawSettingResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateAutoWithdrawSettingResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateAutoWithdrawSettingResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateAutoWithdrawSettingResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateAutoWithdrawSettingResponse500> Operation failed.
   */
  updateAutoWithdrawSetting(body: types.UpdateAutoWithdrawSettingBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/payouts/contractors/settings/auto_withdraw', 'post', body);
  }

  /**
   * Modify bank account for an EOR employee.
   *  **Token scopes**: `worker:write`
   *
   * @summary Modify bank account for an EOR employee
   * @throws FetchError<400, types.PatchEorBankAccountResponse400> Operation failed.
   * @throws FetchError<401, types.PatchEorBankAccountResponse401> Operation failed.
   * @throws FetchError<403, types.PatchEorBankAccountResponse403> Operation failed.
   * @throws FetchError<404, types.PatchEorBankAccountResponse404> Operation failed.
   * @throws FetchError<500, types.PatchEorBankAccountResponse500> Operation failed.
   */
  patchEORBankAccount(body: types.PatchEorBankAccountBodyParam, metadata: types.PatchEorBankAccountMetadataParam): Promise<FetchResponse<201, types.PatchEorBankAccountResponse201>> {
    return this.core.fetch('/daas/banks/{bank_id}', 'patch', body, metadata);
  }

  /**
   * Edit Profie
   *  **Token scopes**: `profile:write`, `profile:read`
   *
   * @summary Profiles
   * @throws FetchError<400, types.ProfilesResponse400> Invalid request parameters.
   * @throws FetchError<401, types.ProfilesResponse401> Operation failed.
   * @throws FetchError<403, types.ProfilesResponse403> Operation failed.
   * @throws FetchError<404, types.ProfilesResponse404> Operation failed.
   * @throws FetchError<500, types.ProfilesResponse500> Operation failed.
   */
  profiles(body: types.ProfilesBodyParam): Promise<FetchResponse<200, types.ProfilesResponse200>> {
    return this.core.fetch('/profiles', 'patch', body);
  }

  /**
   * Retrieve bank account form guide for an EOR employee. This data can be used to add a new
   * bank account for an employee.
   *  **Token scopes**: `worker:read`
   *
   * @summary Retrieve bank account guide
   * @throws FetchError<400, types.GetEorBankAccountGuideResponse400> Operation failed.
   * @throws FetchError<401, types.GetEorBankAccountGuideResponse401> Operation failed.
   * @throws FetchError<403, types.GetEorBankAccountGuideResponse403> Operation failed.
   * @throws FetchError<404, types.GetEorBankAccountGuideResponse404> Operation failed.
   * @throws FetchError<500, types.GetEorBankAccountGuideResponse500> Operation failed.
   */
  getEORBankAccountGuide(): Promise<FetchResponse<200, types.GetEorBankAccountGuideResponse200>> {
    return this.core.fetch('/eor/workers/banks/guide', 'get');
  }

  /**
   * Get list of tax documents for an employee.
   *  **Token scopes**: `worker:read`
   *
   * @summary List of tax documents for an employee
   * @throws FetchError<400, types.GetEorEmployeeTaxDocumentsResponse400> Operation failed.
   * @throws FetchError<401, types.GetEorEmployeeTaxDocumentsResponse401> Operation failed.
   * @throws FetchError<403, types.GetEorEmployeeTaxDocumentsResponse403> Operation failed.
   * @throws FetchError<404, types.GetEorEmployeeTaxDocumentsResponse404> Operation failed.
   * @throws FetchError<500, types.GetEorEmployeeTaxDocumentsResponse500> Operation failed.
   */
  getEorEmployeeTaxDocuments(): Promise<FetchResponse<200, types.GetEorEmployeeTaxDocumentsResponse200>> {
    return this.core.fetch('/daas/tax-documents', 'get');
  }

  /**
   * Delete a specific task associated with the contract. Optionally, a reason can be
   * provided for auditing or documentation purposes.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Delete task
   * @throws FetchError<401, types.DeleteContractTaskByIdResponse401> Operation failed.
   * @throws FetchError<500, types.DeleteContractTaskByIdResponse500> Operation failed.
   */
  deleteContractTaskById(metadata: types.DeleteContractTaskByIdMetadataParam): Promise<FetchResponse<200, types.DeleteContractTaskByIdResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/tasks/{task_id}', 'delete', metadata);
  }

  /**
   * Fetches a list of payment dates associated with a specific contract. This endpoint
   * provides information on when contractors are scheduled to be paid, along with the
   * current status of each payment cycle.
   *  **Token scopes**: `contracts:read`
   *
   * @summary Retrieve contractor payment dates
   * @throws FetchError<400, types.GetContractPaymentDatesResponse400> Invalid request parameters.
   * @throws FetchError<401, types.GetContractPaymentDatesResponse401> Operation failed.
   * @throws FetchError<403, types.GetContractPaymentDatesResponse403> Operation failed.
   * @throws FetchError<404, types.GetContractPaymentDatesResponse404> Contract not found.
   * @throws FetchError<500, types.GetContractPaymentDatesResponse500> Internal server error.
   */
  getContractPaymentDates(metadata: types.GetContractPaymentDatesMetadataParam): Promise<FetchResponse<200, types.GetContractPaymentDatesResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/payment_cycles', 'get', metadata);
  }

  /**
   * Get all adjustments for the specific contract.
   *  **Token scopes**: `adjustments:read`
   *
   * @summary Retrieve adjustments
   * @throws FetchError<400, types.GetAdjustmentsResponse400> Operation failed.
   * @throws FetchError<401, types.GetAdjustmentsResponse401> Operation failed.
   * @throws FetchError<403, types.GetAdjustmentsResponse403> Operation failed.
   * @throws FetchError<404, types.GetAdjustmentsResponse404> Operation failed.
   * @throws FetchError<500, types.GetAdjustmentsResponse500> Operation failed.
   */
  getAdjustments(metadata: types.GetAdjustmentsMetadataParam): Promise<FetchResponse<200, types.GetAdjustmentsResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/adjustments', 'get', metadata);
  }

  /**
   * Get a full breakdown of a payment made to Deel. Breakdown will include individual
   * invoices and Deel fee as line items.
   *  **Token scopes**: `accounting:read`
   *
   * @summary Retrieve a payment breakdown
   * @throws FetchError<400, types.GetPaymentsBreakDownByIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetPaymentsBreakDownByIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetPaymentsBreakDownByIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetPaymentsBreakDownByIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetPaymentsBreakDownByIdResponse500> Operation failed.
   */
  getPaymentsBreakDownById(metadata: types.GetPaymentsBreakDownByIdMetadataParam): Promise<FetchResponse<200, types.GetPaymentsBreakDownByIdResponse200>> {
    return this.core.fetch('/payments/{payment_id}/breakdown', 'get', metadata);
  }

  /**
   * Get a pre-signed download URL for a GP payslip PDF.
   *  **Token scopes**: `payslips:read`
   *
   * @summary Download payslip PDF
   * @throws FetchError<400, types.GetDownloadUrlForGpPayslipResponse400> Operation failed.
   * @throws FetchError<401, types.GetDownloadUrlForGpPayslipResponse401> Operation failed.
   * @throws FetchError<403, types.GetDownloadUrlForGpPayslipResponse403> Operation failed.
   * @throws FetchError<404, types.GetDownloadUrlForGpPayslipResponse404> Operation failed.
   * @throws FetchError<500, types.GetDownloadUrlForGpPayslipResponse500> Operation failed.
   */
  getDownloadUrlForGPPayslip(metadata: types.GetDownloadUrlForGpPayslipMetadataParam): Promise<FetchResponse<200, types.GetDownloadUrlForGpPayslipResponse200>> {
    return this.core.fetch('/gp/workers/{id}/payslips/{payslipId}/download', 'get', metadata);
  }

  /**
   * Update the PTO policy of a Global Payroll employee.
   *  **Token scopes**: `people:write`
   *
   * @summary Update PTO policy
   * @throws FetchError<400, types.UpdateGpEmployeePtoResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateGpEmployeePtoResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateGpEmployeePtoResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateGpEmployeePtoResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateGpEmployeePtoResponse500> Operation failed.
   */
  updateGPEmployeePto(body: types.UpdateGpEmployeePtoBodyParam, metadata: types.UpdateGpEmployeePtoMetadataParam): Promise<FetchResponse<200, types.UpdateGpEmployeePtoResponse200>> {
    return this.core.fetch('/gp/workers/{worker_id}/pto-policy', 'patch', body, metadata);
  }

  /**
   * Create an immigration case.
   *  **Token scopes**: `immigration:write`
   *
   * @summary Create an immigration case
   * @throws FetchError<400, types.CreateCaseResponse400> Operation failed.
   * @throws FetchError<401, types.CreateCaseResponse401> Operation failed.
   * @throws FetchError<403, types.CreateCaseResponse403> Operation failed.
   * @throws FetchError<404, types.CreateCaseResponse404> Operation failed.
   * @throws FetchError<500, types.CreateCaseResponse500> Operation failed.
   */
  createCase(body: types.CreateCaseBodyParam): Promise<FetchResponse<201, types.CreateCaseResponse201>> {
    return this.core.fetch('/immigration/client/cases', 'post', body);
  }

  /**
   * Create a request to exercise equity.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Create a request to exercise equity.
   * @throws FetchError<400, types.RequestExerciseEquityResponse400> Operation failed.
   * @throws FetchError<401, types.RequestExerciseEquityResponse401> Operation failed.
   * @throws FetchError<403, types.RequestExerciseEquityResponse403> Operation failed.
   * @throws FetchError<404, types.RequestExerciseEquityResponse404> Operation failed.
   * @throws FetchError<500, types.RequestExerciseEquityResponse500> Operation failed.
   */
  requestExerciseEquity(body: types.RequestExerciseEquityBodyParam): Promise<FetchResponse<201, types.RequestExerciseEquityResponse201>> {
    return this.core.fetch('/equity/exercise', 'post', body);
  }

  /**
   * Update EOR Contract
   *  **Token scopes**: `contracts:write`
   *
   * @summary Update EOR Contract
   * @throws FetchError<400, types.UpdateEorContractResponse400> Bad Request
   * @throws FetchError<401, types.UpdateEorContractResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateEorContractResponse403> Forbidden
   * @throws FetchError<404, types.UpdateEorContractResponse404> Not Found
   * @throws FetchError<500, types.UpdateEorContractResponse500> Internal Server Error
   */
  updateEorContract(body: types.UpdateEorContractBodyParam, metadata: types.UpdateEorContractMetadataParam): Promise<FetchResponse<200, types.UpdateEorContractResponse200>> {
    return this.core.fetch('/eor/contract/{oid}', 'patch', body, metadata);
  }

  /**
   * Cancel EOR Contract
   *  **Token scopes**: `contracts:write`
   *
   * @summary Cancel EOR Contract
   * @throws FetchError<400, types.CancelEorContractResponse400> Bad Request
   * @throws FetchError<401, types.CancelEorContractResponse401> Operation failed.
   * @throws FetchError<403, types.CancelEorContractResponse403> Operation failed.
   * @throws FetchError<404, types.CancelEorContractResponse404> Contract not found
   * @throws FetchError<500, types.CancelEorContractResponse500> Operation failed.
   */
  cancelEorContract(body: types.CancelEorContractBodyParam, metadata: types.CancelEorContractMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/eor/contract/{oid}/cancel', 'post', body, metadata);
  }

  /**
   * Update the compensation of a Global Payroll employee. Returns the full compensation
   * history including the update.
   *  **Token scopes**: `people:write`
   *
   * @summary Update compensation
   * @throws FetchError<400, types.UpdateGpEmployeeCompensationResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateGpEmployeeCompensationResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateGpEmployeeCompensationResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateGpEmployeeCompensationResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateGpEmployeeCompensationResponse500> Operation failed.
   */
  updateGPEmployeeCompensation(body: types.UpdateGpEmployeeCompensationBodyParam, metadata: types.UpdateGpEmployeeCompensationMetadataParam): Promise<FetchResponse<200, types.UpdateGpEmployeeCompensationResponse200>> {
    return this.core.fetch('/gp/workers/{worker_id}/compensation', 'patch', body, metadata);
  }

  /**
   * List all onboarding
   *  **Token scopes**: `contracts:read`, `people:read`
   *
   * @summary List onboarding employees
   * @throws FetchError<400, types.ListOnboardingTrackerResponse400> Operation failed.
   * @throws FetchError<401, types.ListOnboardingTrackerResponse401> Operation failed.
   * @throws FetchError<403, types.ListOnboardingTrackerResponse403> Operation failed.
   * @throws FetchError<404, types.ListOnboardingTrackerResponse404> Operation failed.
   * @throws FetchError<500, types.ListOnboardingTrackerResponse500> Operation failed.
   */
  listOnboardingTracker(metadata?: types.ListOnboardingTrackerMetadataParam): Promise<FetchResponse<200, types.ListOnboardingTrackerResponse200>> {
    return this.core.fetch('/onboarding/tracker', 'get', metadata);
  }

  /**
   * Update an existing HRIS Org Structure
   *  **Token scopes**: `organizations:write`
   *
   * @summary Update an existing HRIS Org Structure
   * @throws FetchError<400, types.UpdateOrgStructureResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateOrgStructureResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateOrgStructureResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateOrgStructureResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateOrgStructureResponse500> Operation failed.
   */
  updateOrgStructure(body: types.UpdateOrgStructureBodyParam, metadata: types.UpdateOrgStructureMetadataParam): Promise<FetchResponse<200, types.UpdateOrgStructureResponse200>> {
    return this.core.fetch('/hris/organization_structures/{hrisOrgStr_id}', 'patch', body, metadata);
  }

  /**
   * undefined
   *  **Token scopes**: `organizations:read`
   *
   * @summary Fetch an Org Structure from the Organization
   * @throws FetchError<400, types.GetOrgStructureResponse400> Operation failed.
   * @throws FetchError<401, types.GetOrgStructureResponse401> Operation failed.
   * @throws FetchError<403, types.GetOrgStructureResponse403> Operation failed.
   * @throws FetchError<404, types.GetOrgStructureResponse404> Operation failed.
   * @throws FetchError<500, types.GetOrgStructureResponse500> Operation failed.
   */
  getOrgStructure(metadata: types.GetOrgStructureMetadataParam): Promise<FetchResponse<200, types.GetOrgStructureResponse200>> {
    return this.core.fetch('/hris/organization_structures/{hrisOrgStr_id}', 'get', metadata);
  }

  /**
   * Delete an Org Structure from the Organization
   *  **Token scopes**: `organizations:write`
   *
   * @summary Delete an Org Structure from the Organization
   * @throws FetchError<400, types.DeleteOrgStructureResponse400> Operation failed.
   * @throws FetchError<401, types.DeleteOrgStructureResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteOrgStructureResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteOrgStructureResponse404> Operation failed.
   * @throws FetchError<500, types.DeleteOrgStructureResponse500> Operation failed.
   */
  deleteOrgStructure(metadata: types.DeleteOrgStructureMetadataParam): Promise<FetchResponse<200, types.DeleteOrgStructureResponse200>> {
    return this.core.fetch('/hris/organization_structures/{hrisOrgStr_id}', 'delete', metadata);
  }

  /**
   * Create a parent worker relation with external id.
   *  **Token scopes**: `profile:write`
   *
   * @summary Create a parent worker relation with external id
   * @throws FetchError<400, types.CreateOrUpdateParentRelationBetweenProfilesResponse400> Operation failed.
   * @throws FetchError<401, types.CreateOrUpdateParentRelationBetweenProfilesResponse401> Operation failed.
   * @throws FetchError<403, types.CreateOrUpdateParentRelationBetweenProfilesResponse403> Operation failed.
   * @throws FetchError<404, types.CreateOrUpdateParentRelationBetweenProfilesResponse404> Operation failed.
   * @throws FetchError<500, types.CreateOrUpdateParentRelationBetweenProfilesResponse500> Operation failed.
   */
  createOrUpdateParentRelationBetweenProfiles(body: types.CreateOrUpdateParentRelationBetweenProfilesBodyParam, metadata: types.CreateOrUpdateParentRelationBetweenProfilesMetadataParam): Promise<FetchResponse<204, types.CreateOrUpdateParentRelationBetweenProfilesResponse204>> {
    return this.core.fetch('/hris/worker_relations/profile/external/{hrisProfileExternalId}/parent', 'put', body, metadata);
  }

  /**
   * Creates a new worker account with the specified profile type
   *
   * @summary Create a new worker
   * @throws FetchError<400, types.CreateWorkerResponse400> Validation error
   * @throws FetchError<401, types.CreateWorkerResponse401> Operation failed.
   * @throws FetchError<403, types.CreateWorkerResponse403> Operation failed.
   * @throws FetchError<404, types.CreateWorkerResponse404> Operation failed.
   * @throws FetchError<500, types.CreateWorkerResponse500> Internal server error
   */
  createWorker(body: types.CreateWorkerBodyParam): Promise<FetchResponse<201, types.CreateWorkerResponse201>> {
    return this.core.fetch('/worker', 'post', body);
  }

  /**
   * Get all categories for your organization.
   *  **Token scopes**: `adjustments:read`
   *
   * @summary Retrieve categories
   * @throws FetchError<400, types.GetCategoriesResponse400> Operation failed.
   * @throws FetchError<401, types.GetCategoriesResponse401> Operation failed.
   * @throws FetchError<403, types.GetCategoriesResponse403> Operation failed.
   * @throws FetchError<404, types.GetCategoriesResponse404> Operation failed.
   * @throws FetchError<500, types.GetCategoriesResponse500> Operation failed.
   */
  getCategories(): Promise<FetchResponse<200, types.GetCategoriesResponse200>> {
    return this.core.fetch('/adjustments/categories', 'get');
  }

  /**
   * Review a timesheet to approve or decline submitted work.
   *  **Token scopes**: `timesheets:write`
   *
   * @summary Review a single timesheet
   * @throws FetchError<400, types.CreateTimesheetReviewResponse400> Operation failed.
   * @throws FetchError<401, types.CreateTimesheetReviewResponse401> Operation failed.
   * @throws FetchError<403, types.CreateTimesheetReviewResponse403> Operation failed.
   * @throws FetchError<404, types.CreateTimesheetReviewResponse404> Operation failed.
   * @throws FetchError<500, types.CreateTimesheetReviewResponse500> Operation failed.
   */
  createTimesheetReview(body: types.CreateTimesheetReviewBodyParam, metadata: types.CreateTimesheetReviewMetadataParam): Promise<FetchResponse<201, types.CreateTimesheetReviewResponse201>> {
    return this.core.fetch('/timesheets/{id}/reviews', 'post', body, metadata);
  }

  /**
   * Create a single deduction loan
   *  **Token scopes**: `benefits:write`
   *
   * @summary Create a single deduction loan
   * @throws FetchError<400, types.Post401KSingleDeductionDefinitionResponse400> Operation failed.
   * @throws FetchError<401, types.Post401KSingleDeductionDefinitionResponse401> Operation failed.
   * @throws FetchError<403, types.Post401KSingleDeductionDefinitionResponse403> Operation failed.
   * @throws FetchError<404, types.Post401KSingleDeductionDefinitionResponse404> Operation failed.
   * @throws FetchError<500, types.Post401KSingleDeductionDefinitionResponse500> Operation failed.
   */
  post401kSingleDeductionDefinition(body: types.Post401KSingleDeductionDefinitionBodyParam, metadata: types.Post401KSingleDeductionDefinitionMetadataParam): Promise<FetchResponse<200, types.Post401KSingleDeductionDefinitionResponse200>> {
    return this.core.fetch('/benefits/legal-entities/{id}/contracts/{contract_id}/plans/{plan_id}/deductions', 'post', body, metadata);
  }

  /**
   * Fetch immigration supported visa types by country
   *  **Token scopes**: `immigration:read`
   *
   * @summary Immigration visa types
   * @throws FetchError<400, types.ImmigrationVisaTypesResponse400> Operation failed.
   * @throws FetchError<401, types.ImmigrationVisaTypesResponse401> Operation failed.
   * @throws FetchError<403, types.ImmigrationVisaTypesResponse403> Operation failed.
   * @throws FetchError<404, types.ImmigrationVisaTypesResponse404> Operation failed.
   * @throws FetchError<500, types.ImmigrationVisaTypesResponse500> Operation failed.
   */
  immigrationVisaTypes(metadata: types.ImmigrationVisaTypesMetadataParam): Promise<FetchResponse<200, types.ImmigrationVisaTypesResponse200>> {
    return this.core.fetch('/immigration/visa-types/{country_code}', 'get', metadata);
  }

  /**
   * Retrieve a paginated list of shift rates, including details such as rate name, type,
   * value, and timestamps. Pagination parameters can be used to control the size and
   * position of the result set.
   *  **Token scopes**: `time-tracking:read`
   *
   * @summary Retrieve a Paginated List of Shift Rates
   * @throws FetchError<400, types.GetShiftRatesResponse400> Invalid query parameters provided (e.g., non-numeric limit or offset).
   * @throws FetchError<401, types.GetShiftRatesResponse401> Operation failed.
   * @throws FetchError<403, types.GetShiftRatesResponse403> Operation failed.
   * @throws FetchError<404, types.GetShiftRatesResponse404> Operation failed.
   * @throws FetchError<500, types.GetShiftRatesResponse500> Internal server error encountered while retrieving shift rates.
   */
  getShiftRates(metadata?: types.GetShiftRatesMetadataParam): Promise<FetchResponse<200, types.GetShiftRatesResponse200>> {
    return this.core.fetch('/time_tracking/shift_rates', 'get', metadata);
  }

  /**
   * Create a new shift rate with the specified attributes such as name, type, value, and a
   * unique external identifier.
   *  **Token scopes**: `time-tracking:write`
   *
   * @summary Create a New Shift Rate
   * @throws FetchError<400, types.CreateShiftRateResponse400> Invalid input provided for the shift rate creation.
   * @throws FetchError<401, types.CreateShiftRateResponse401> Operation failed.
   * @throws FetchError<403, types.CreateShiftRateResponse403> Operation failed.
   * @throws FetchError<404, types.CreateShiftRateResponse404> Operation failed.
   * @throws FetchError<409, types.CreateShiftRateResponse409> Conflict occurred, likely due to a duplicate external ID.
   * @throws FetchError<500, types.CreateShiftRateResponse500> Internal server error encountered while creating the shift rate.
   */
  createShiftRate(body: types.CreateShiftRateBodyParam): Promise<FetchResponse<201, types.CreateShiftRateResponse201>> {
    return this.core.fetch('/time_tracking/shift_rates', 'post', body);
  }

  /**
   * Retrieve requireements for bank transfer method creation
   *  **Token scopes**: `worker:read`, `worker:write`
   *
   * @summary Get bank transfer requirements
   * @throws FetchError<400, types.GetBankTransferRequirementsResponse400> Operation failed.
   * @throws FetchError<401, types.GetBankTransferRequirementsResponse401> Operation failed.
   * @throws FetchError<403, types.GetBankTransferRequirementsResponse403> Operation failed.
   * @throws FetchError<404, types.GetBankTransferRequirementsResponse404> Operation failed.
   * @throws FetchError<500, types.GetBankTransferRequirementsResponse500> Operation failed.
   */
  getBankTransferRequirements(metadata: types.GetBankTransferRequirementsMetadataParam): Promise<FetchResponse<200, types.GetBankTransferRequirementsResponse200>> {
    return this.core.fetch('/payouts/contractors/methods/bank_transfers/requirements', 'get', metadata);
  }

  /**
   * Fetch immigration document details by document id
   *  **Token scopes**: `immigration:read`
   *
   * @summary Immigration document
   * @throws FetchError<400, types.ImmigrationDocumentResponse400> Operation failed.
   * @throws FetchError<401, types.ImmigrationDocumentResponse401> Operation failed.
   * @throws FetchError<403, types.ImmigrationDocumentResponse403> Operation failed.
   * @throws FetchError<404, types.ImmigrationDocumentResponse404> Operation failed.
   * @throws FetchError<500, types.ImmigrationDocumentResponse500> Operation failed.
   */
  immigrationDocument(metadata: types.ImmigrationDocumentMetadataParam): Promise<FetchResponse<200, types.ImmigrationDocumentResponse200>> {
    return this.core.fetch('/immigration/documents/{id}', 'get', metadata);
  }

  /**
   * Retrieve an IC and EOR contract agreement content in HTML. If no template is specified,
   * the default or currently assigned template will be used. This endpoint does not support
   * Global Payroll contract type.
   *  **Token scopes**: `contracts:read`
   *
   * @summary Preview a contract agreement
   * @throws FetchError<400, types.GetContractPreviewResponse400> Operation failed.
   * @throws FetchError<401, types.GetContractPreviewResponse401> Operation failed.
   * @throws FetchError<403, types.GetContractPreviewResponse403> Operation failed.
   * @throws FetchError<404, types.GetContractPreviewResponse404> Operation failed.
   * @throws FetchError<500, types.GetContractPreviewResponse500> Operation failed.
   */
  getContractPreview(metadata: types.GetContractPreviewMetadataParam): Promise<FetchResponse<200, types.GetContractPreviewResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/preview', 'get', metadata);
  }

  /**
   * Create a Global Payroll contract.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Create a contract
   * @throws FetchError<400, types.CreateGpContractResponse400> Operation failed.
   * @throws FetchError<401, types.CreateGpContractResponse401> Operation failed.
   * @throws FetchError<403, types.CreateGpContractResponse403> Operation failed.
   * @throws FetchError<404, types.CreateGpContractResponse404> Operation failed.
   * @throws FetchError<500, types.CreateGpContractResponse500> Operation failed.
   */
  createGPContract(body: types.CreateGpContractBodyParam): Promise<FetchResponse<201, types.CreateGpContractResponse201>> {
    return this.core.fetch('/contracts/gp', 'post', body);
  }

  /**
   * Create child worker relation.
   *  **Token scopes**: `profile:write`
   *
   * @summary Create child worker relation
   * @throws FetchError<400, types.UpsertChildWorkerRelationsResponse400> Operation failed.
   * @throws FetchError<401, types.UpsertChildWorkerRelationsResponse401> Operation failed.
   * @throws FetchError<403, types.UpsertChildWorkerRelationsResponse403> Operation failed.
   * @throws FetchError<404, types.UpsertChildWorkerRelationsResponse404> Operation failed.
   * @throws FetchError<500, types.UpsertChildWorkerRelationsResponse500> Operation failed.
   */
  upsertChildWorkerRelations(body: types.UpsertChildWorkerRelationsBodyParam, metadata: types.UpsertChildWorkerRelationsMetadataParam): Promise<FetchResponse<204, types.UpsertChildWorkerRelationsResponse204>> {
    return this.core.fetch('/hris/worker_relations/profile/{hrisProfileOid}/child', 'put', body, metadata);
  }

  /**
   * Delay EOR employee onboarding
   *  **Token scopes**: `contracts:write`
   *
   * @summary Delay EOR employee onboarding
   * @throws FetchError<400, types.DelayEorEmployeeOnboardingResponse400> Bad Request - Contract not found or invalid status
   * @throws FetchError<401, types.DelayEorEmployeeOnboardingResponse401> Operation failed.
   * @throws FetchError<403, types.DelayEorEmployeeOnboardingResponse403> Operation failed.
   * @throws FetchError<404, types.DelayEorEmployeeOnboardingResponse404> Operation failed.
   * @throws FetchError<500, types.DelayEorEmployeeOnboardingResponse500> Operation failed.
   */
  delayEorEmployeeOnboarding(body: types.DelayEorEmployeeOnboardingBodyParam, metadata: types.DelayEorEmployeeOnboardingMetadataParam): Promise<FetchResponse<200, types.DelayEorEmployeeOnboardingResponse200>> {
    return this.core.fetch('/eor/contract/{oid}/delay-onboarding', 'patch', body, metadata);
  }

  /**
   * Create a parent worker relation.
   *  **Token scopes**: `profile:write`
   *
   * @summary Create a parent worker relation
   * @throws FetchError<400, types.UpsertParentWorkerRelationsResponse400> Operation failed.
   * @throws FetchError<401, types.UpsertParentWorkerRelationsResponse401> Operation failed.
   * @throws FetchError<403, types.UpsertParentWorkerRelationsResponse403> Operation failed.
   * @throws FetchError<404, types.UpsertParentWorkerRelationsResponse404> Operation failed.
   * @throws FetchError<500, types.UpsertParentWorkerRelationsResponse500> Operation failed.
   */
  upsertParentWorkerRelations(body: types.UpsertParentWorkerRelationsBodyParam, metadata: types.UpsertParentWorkerRelationsMetadataParam): Promise<FetchResponse<204, types.UpsertParentWorkerRelationsResponse204>> {
    return this.core.fetch('/hris/worker_relations/profile/{hrisProfileOid}/parent', 'put', body, metadata);
  }

  /**
   * Updates a bank transfer method
   *  **Token scopes**: `worker:read`, `worker:write`
   *
   * @summary Update a bank transfer method
   * @throws FetchError<400, types.UpdateBankTransferMethodResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateBankTransferMethodResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateBankTransferMethodResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateBankTransferMethodResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateBankTransferMethodResponse500> Operation failed.
   */
  updateBankTransferMethod(body: types.UpdateBankTransferMethodBodyParam, metadata: types.UpdateBankTransferMethodMetadataParam): Promise<FetchResponse<200, types.UpdateBankTransferMethodResponse200>> {
    return this.core.fetch('/payouts/contractors/methods/{id}', 'put', body, metadata);
  }

  /**
   * Get legal entity data from organization integrated with external benefits vendor
   *  **Token scopes**: `organizations:read`
   *
   * @summary Get legal entity data from organization integrated with external benefits vendor
   * @throws FetchError<400, types.GetLegalEntityResponse400> Operation failed.
   * @throws FetchError<401, types.GetLegalEntityResponse401> Operation failed.
   * @throws FetchError<403, types.GetLegalEntityResponse403> Operation failed.
   * @throws FetchError<404, types.GetLegalEntityResponse404> Operation failed.
   * @throws FetchError<500, types.GetLegalEntityResponse500> Operation failed.
   */
  getLegalEntity(metadata: types.GetLegalEntityMetadataParam): Promise<FetchResponse<200, types.GetLegalEntityResponse200>> {
    return this.core.fetch('/benefits/legal-entities/{id}', 'get', metadata);
  }

  /**
   * Get custom field from contract by id
   *  **Token scopes**: `contracts:read`
   *
   * @summary Get custom fields from contracts
   * @throws FetchError<400, types.GetCustomFieldFromContractsByIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetCustomFieldFromContractsByIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetCustomFieldFromContractsByIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetCustomFieldFromContractsByIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetCustomFieldFromContractsByIdResponse500> Operation failed.
   */
  getCustomFieldFromContractsById(metadata: types.GetCustomFieldFromContractsByIdMetadataParam): Promise<FetchResponse<200, types.GetCustomFieldFromContractsByIdResponse200>> {
    return this.core.fetch('/contracts/custom_fields/{id}', 'get', metadata);
  }

  /**
   * Create a hierarchical relation between a worker and its subordinates using external IDs
   * to identify them.
   *  **Token scopes**: `profile:write`
   *
   * @summary Create worker relation with external Ids
   * @throws FetchError<400, types.CreateWorkerRelationExternalIdResponse400> Operation failed.
   * @throws FetchError<401, types.CreateWorkerRelationExternalIdResponse401> Operation failed.
   * @throws FetchError<403, types.CreateWorkerRelationExternalIdResponse403> Operation failed.
   * @throws FetchError<404, types.CreateWorkerRelationExternalIdResponse404> Operation failed.
   * @throws FetchError<500, types.CreateWorkerRelationExternalIdResponse500> Operation failed.
   */
  createWorkerRelationExternalId(body: types.CreateWorkerRelationExternalIdBodyParam): Promise<FetchResponse<201, types.CreateWorkerRelationExternalIdResponse201>> {
    return this.core.fetch('/hris/worker_relations/profile/external', 'post', body);
  }

  /**
   * Create a hierarchical relation between a worker and its subordinates.
   *  **Token scopes**: `profile:write`
   *
   * @summary Create a worker relation
   * @throws FetchError<400, types.CreateWorkerRelationResponse400> Operation failed.
   * @throws FetchError<401, types.CreateWorkerRelationResponse401> Operation failed.
   * @throws FetchError<403, types.CreateWorkerRelationResponse403> Operation failed.
   * @throws FetchError<404, types.CreateWorkerRelationResponse404> Operation failed.
   * @throws FetchError<500, types.CreateWorkerRelationResponse500> Operation failed.
   */
  createWorkerRelation(body: types.CreateWorkerRelationBodyParam): Promise<FetchResponse<201, types.CreateWorkerRelationResponse201>> {
    return this.core.fetch('/hris/worker_relations/profile', 'post', body);
  }

  /**
   * Retrieve a list of payslip records for a specific employee, detailing payment periods,
   * status, and associated identifiers.
   *  **Token scopes**: `payslips:read`
   *
   * @summary Retrieve employee payslip records
   * @throws FetchError<400, types.GetEorWorkerPayslipsResponse400> Invalid request. The worker ID format is incorrect.
   * @throws FetchError<401, types.GetEorWorkerPayslipsResponse401> Operation failed.
   * @throws FetchError<403, types.GetEorWorkerPayslipsResponse403> Operation failed.
   * @throws FetchError<404, types.GetEorWorkerPayslipsResponse404> Worker not found or no payslips available.
   * @throws FetchError<500, types.GetEorWorkerPayslipsResponse500> Operation failed.
   */
  getEORWorkerPayslips(metadata: types.GetEorWorkerPayslipsMetadataParam): Promise<FetchResponse<200, types.GetEorWorkerPayslipsResponse200>> {
    return this.core.fetch('/eor/workers/{worker_id}/payslips', 'get', metadata);
  }

  /**
   * Create organization custom role.
   *  **Token scopes**: `organizations:write`
   *
   * @summary Create organization custom role.
   * @throws FetchError<400, types.CreateOrganizationRoleResponse400> Operation failed.
   * @throws FetchError<401, types.CreateOrganizationRoleResponse401> Operation failed.
   * @throws FetchError<403, types.CreateOrganizationRoleResponse403> Operation failed.
   * @throws FetchError<404, types.CreateOrganizationRoleResponse404> Operation failed.
   * @throws FetchError<500, types.CreateOrganizationRoleResponse500> Operation failed.
   */
  createOrganizationRole(body: types.CreateOrganizationRoleBodyParam): Promise<FetchResponse<200, types.CreateOrganizationRoleResponse200>> {
    return this.core.fetch('/roles', 'post', body);
  }

  /**
   * Retrieve a list of roles assigned within the current organization. Each role has a
   * unique identifier, name, scope, and optional HRIS structure ID. This helps determine the
   * types of roles within the organization and their corresponding access levels.
   *  **Token scopes**: `organizations:read`
   *
   * @summary Get the roles of the current organization.
   * @throws FetchError<400, types.GetOrganizationRolesResponse400> Bad request. The request was malformed or missing required parameters.
   * @throws FetchError<401, types.GetOrganizationRolesResponse401> Unauthorized. The request is missing authentication credentials or the credentials
   * provided are invalid.
   * @throws FetchError<403, types.GetOrganizationRolesResponse403> Operation failed.
   * @throws FetchError<404, types.GetOrganizationRolesResponse404> Operation failed.
   * @throws FetchError<500, types.GetOrganizationRolesResponse500> Internal server error. An error occurred while processing the request.
   */
  getOrganizationRoles(): Promise<FetchResponse<200, types.GetOrganizationRolesResponse200>> {
    return this.core.fetch('/roles', 'get');
  }

  /**
   * undefined
   *  **Token scopes**: `organizations:write`
   *
   * @summary Update organization custom role
   * @throws FetchError<400, types.UpdateOrganizationRoleResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateOrganizationRoleResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateOrganizationRoleResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateOrganizationRoleResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateOrganizationRoleResponse500> Operation failed.
   */
  updateOrganizationRole(body: types.UpdateOrganizationRoleBodyParam, metadata: types.UpdateOrganizationRoleMetadataParam): Promise<FetchResponse<200, types.UpdateOrganizationRoleResponse200>> {
    return this.core.fetch('/roles/{roleId}', 'patch', body, metadata);
  }

  /**
   * Delete the custom field value from Worker by Id.
   *  **Token scopes**: `people:write`
   *
   * @summary Delete the custom field value from Worker by Id
   * @throws FetchError<400, types.DeleteCustomFieldValueFromWorkerResponse400> Operation failed.
   * @throws FetchError<401, types.DeleteCustomFieldValueFromWorkerResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteCustomFieldValueFromWorkerResponse403> Operation failed.
   * @throws FetchError<500, types.DeleteCustomFieldValueFromWorkerResponse500> Operation failed.
   */
  deleteCustomFieldValueFromWorker(metadata: types.DeleteCustomFieldValueFromWorkerMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/people/{worker_id}/custom_fields/{id}', 'delete', metadata);
  }

  /**
   * Delete a Worker Relation Type by the external ID.
   *  **Token scopes**: `organizations:write`
   *
   * @summary Delete a worker relation type by external id
   * @throws FetchError<400, types.DeleteWorkerRelationTypeExternalIdResponse400> Operation failed.
   * @throws FetchError<401, types.DeleteWorkerRelationTypeExternalIdResponse401> Operation failed.
   * @throws FetchError<403, types.DeleteWorkerRelationTypeExternalIdResponse403> Operation failed.
   * @throws FetchError<404, types.DeleteWorkerRelationTypeExternalIdResponse404> Operation failed.
   * @throws FetchError<500, types.DeleteWorkerRelationTypeExternalIdResponse500> Operation failed.
   */
  deleteWorkerRelationTypeExternalId(metadata: types.DeleteWorkerRelationTypeExternalIdMetadataParam): Promise<FetchResponse<204, types.DeleteWorkerRelationTypeExternalIdResponse204>> {
    return this.core.fetch('/hris/worker_relations/types/external/{externalId}', 'delete', metadata);
  }

  /**
   * Update a worker relation type by external id.
   *  **Token scopes**: `organizations:write`
   *
   * @summary Update a worker relation type by external id
   * @throws FetchError<400, types.UpdateWorkerRelationTypeExternalIdResponse400> Operation failed.
   * @throws FetchError<401, types.UpdateWorkerRelationTypeExternalIdResponse401> Operation failed.
   * @throws FetchError<403, types.UpdateWorkerRelationTypeExternalIdResponse403> Operation failed.
   * @throws FetchError<404, types.UpdateWorkerRelationTypeExternalIdResponse404> Operation failed.
   * @throws FetchError<500, types.UpdateWorkerRelationTypeExternalIdResponse500> Operation failed.
   */
  updateWorkerRelationTypeExternalId(body: types.UpdateWorkerRelationTypeExternalIdBodyParam, metadata: types.UpdateWorkerRelationTypeExternalIdMetadataParam): Promise<FetchResponse<204, types.UpdateWorkerRelationTypeExternalIdResponse204>> {
    return this.core.fetch('/hris/worker_relations/types/external/{externalId}', 'patch', body, metadata);
  }

  /**
   * Approve an equity exercise.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Approve an equity exercise
   * @throws FetchError<400, types.ApproveExerciseEquityResponse400> Operation failed.
   * @throws FetchError<401, types.ApproveExerciseEquityResponse401> Operation failed.
   * @throws FetchError<403, types.ApproveExerciseEquityResponse403> Operation failed.
   * @throws FetchError<404, types.ApproveExerciseEquityResponse404> Operation failed.
   * @throws FetchError<500, types.ApproveExerciseEquityResponse500> Operation failed.
   */
  approveExerciseEquity(body: types.ApproveExerciseEquityBodyParam, metadata: types.ApproveExerciseEquityMetadataParam): Promise<FetchResponse<200, types.ApproveExerciseEquityResponse200>> {
    return this.core.fetch('/equity/exercise/{public_id}', 'patch', body, metadata);
  }

  /**
   * Get custom field from people by id.
   *  **Token scopes**: `people:read`
   *
   * @summary Get custom field from people by id
   * @throws FetchError<400, types.GetCustomFieldFromPeopleByIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetCustomFieldFromPeopleByIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetCustomFieldFromPeopleByIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetCustomFieldFromPeopleByIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetCustomFieldFromPeopleByIdResponse500> Operation failed.
   */
  getCustomFieldFromPeopleById(metadata: types.GetCustomFieldFromPeopleByIdMetadataParam): Promise<FetchResponse<200, types.GetCustomFieldFromPeopleByIdResponse200>> {
    return this.core.fetch('/people/custom_fields/{id}', 'get', metadata);
  }

  /**
   * Get onboarding overview
   *  **Token scopes**: `contracts:read`, `people:read`
   *
   * @summary Get onboarding details by onboarding tracker ID
   * @throws FetchError<400, types.GetOnboardingDetailsByTrackerIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetOnboardingDetailsByTrackerIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetOnboardingDetailsByTrackerIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetOnboardingDetailsByTrackerIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetOnboardingDetailsByTrackerIdResponse500> Operation failed.
   */
  getOnboardingDetailsByTrackerId(metadata: types.GetOnboardingDetailsByTrackerIdMetadataParam): Promise<FetchResponse<200, types.GetOnboardingDetailsByTrackerIdResponse200>> {
    return this.core.fetch('/onboarding/tracker/{id}', 'get', metadata);
  }

  /**
   * Retrieve a list of paid invoices for your workforce.
   *  **Token scopes**: `accounting:read`
   *
   * @summary Retrieve invoices
   * @throws FetchError<400, types.GetInvoiceListResponse400> Operation failed.
   * @throws FetchError<401, types.GetInvoiceListResponse401> Operation failed.
   * @throws FetchError<403, types.GetInvoiceListResponse403> Operation failed.
   * @throws FetchError<404, types.GetInvoiceListResponse404> Operation failed.
   * @throws FetchError<500, types.GetInvoiceListResponse500> Operation failed.
   */
  getInvoiceList(metadata?: types.GetInvoiceListMetadataParam): Promise<FetchResponse<200, types.GetInvoiceListResponse200>> {
    return this.core.fetch('/invoices', 'get', metadata);
  }

  /**
   * This API allows clients and employees with viewer permissions to retrieve termination
   * data. It ensures that only authorized users can access sensitive information related to
   * terminations.
   *  **Token scopes**: `contracts:read`
   *
   * @summary Get termination
   * @throws FetchError<400, types.GetEorTerminationResponse400> Operation failed.
   * @throws FetchError<401, types.GetEorTerminationResponse401> Unauthorized response
   * @throws FetchError<403, types.GetEorTerminationResponse403> Forbidden response
   * @throws FetchError<404, types.GetEorTerminationResponse404> Not Found response
   * @throws FetchError<500, types.GetEorTerminationResponse500> Operation failed.
   */
  getEorTermination(metadata: types.GetEorTerminationMetadataParam): Promise<FetchResponse<200, types.GetEorTerminationResponse200>> {
    return this.core.fetch('/eor/{oid}/terminations/{terminationId}', 'get', metadata);
  }

  /**
   * Retrieve lookup information such as currencies, countries, entity types, or SIC numbers.
   * Use the `type` query parameter to specify which data to retrieve.
   *  **Token scopes**: `legal-entity:read`
   *
   * @summary Retrieve lookup information for currencies, countries, entity types, etc
   * @throws FetchError<400, types.GetLookupsResponse400> Invalid request parameters.
   * @throws FetchError<401, types.GetLookupsResponse401> Operation failed.
   * @throws FetchError<403, types.GetLookupsResponse403> Operation failed.
   * @throws FetchError<404, types.GetLookupsResponse404> Operation failed.
   * @throws FetchError<500, types.GetLookupsResponse500> Operation failed.
   */
  getLookups(metadata: types.GetLookupsMetadataParam): Promise<FetchResponse<200, types.GetLookupsResponse200>> {
    return this.core.fetch('/lookups', 'get', metadata);
  }

  /**
   * Dynamic Requirements
   *  **Token scopes**: `worker:read`, `worker:write`
   *
   * @summary Dynamic Requirements
   * @throws FetchError<400, types.DynamicRequirementsResponse400> Operation failed.
   * @throws FetchError<401, types.DynamicRequirementsResponse401> Operation failed.
   * @throws FetchError<403, types.DynamicRequirementsResponse403> Operation failed.
   * @throws FetchError<404, types.DynamicRequirementsResponse404> Operation failed.
   * @throws FetchError<500, types.DynamicRequirementsResponse500> Operation failed.
   */
  dynamicRequirements(body?: types.DynamicRequirementsBodyParam): Promise<FetchResponse<200, types.DynamicRequirementsResponse200>> {
    return this.core.fetch('/payouts/employees/methods/bank_transfers/requirements', 'post', body);
  }

  /**
   * Retrieve a list of countries supported by Deel, along with details about visa and EoR
   * support, sub-territories, and their classifications.
   *
   * @summary Retrieve Country List
   * @throws FetchError<400, types.GetCountriesResponse400> Operation failed.
   * @throws FetchError<401, types.GetCountriesResponse401> Operation failed.
   * @throws FetchError<403, types.GetCountriesResponse403> Operation failed.
   * @throws FetchError<404, types.GetCountriesResponse404> Operation failed.
   * @throws FetchError<500, types.GetCountriesResponse500> Operation failed.
   */
  getCountries(): Promise<FetchResponse<200, types.GetCountriesResponse200>> {
    return this.core.fetch('/lookups/countries', 'get');
  }

  /**
   * Create worker relation type.
   *  **Token scopes**: `organizations:write`
   *
   * @summary Create worker relation type
   * @throws FetchError<400, types.CreateWorkerRelationTypeResponse400> Operation failed.
   * @throws FetchError<401, types.CreateWorkerRelationTypeResponse401> Operation failed.
   * @throws FetchError<403, types.CreateWorkerRelationTypeResponse403> Operation failed.
   * @throws FetchError<404, types.CreateWorkerRelationTypeResponse404> Operation failed.
   * @throws FetchError<500, types.CreateWorkerRelationTypeResponse500> Operation failed.
   */
  createWorkerRelationType(body: types.CreateWorkerRelationTypeBodyParam): Promise<FetchResponse<201, types.CreateWorkerRelationTypeResponse201>> {
    return this.core.fetch('/hris/worker_relations/types', 'post', body);
  }

  /**
   * Retrieve all worker relation types.
   *  **Token scopes**: `organizations:read`
   *
   * @summary Retrieve all worker relation types
   * @throws FetchError<400, types.GetAllWorkerRelationTypesResponse400> Operation failed.
   * @throws FetchError<401, types.GetAllWorkerRelationTypesResponse401> Operation failed.
   * @throws FetchError<403, types.GetAllWorkerRelationTypesResponse403> Operation failed.
   * @throws FetchError<404, types.GetAllWorkerRelationTypesResponse404> Operation failed.
   * @throws FetchError<500, types.GetAllWorkerRelationTypesResponse500> Operation failed.
   */
  getAllWorkerRelationTypes(): Promise<FetchResponse<200, types.GetAllWorkerRelationTypesResponse200>> {
    return this.core.fetch('/hris/worker_relations/types', 'get');
  }

  /**
   * Retrieve the list of currencies supported by Deel, including their ISO codes and names.
   *
   * @summary Retrieve Supported Currency List
   * @throws FetchError<400, types.GetCurrenciesResponse400> Operation failed.
   * @throws FetchError<401, types.GetCurrenciesResponse401> Operation failed.
   * @throws FetchError<403, types.GetCurrenciesResponse403> Operation failed.
   * @throws FetchError<404, types.GetCurrenciesResponse404> Operation failed.
   * @throws FetchError<500, types.GetCurrenciesResponse500> Operation failed.
   */
  getCurrencies(): Promise<FetchResponse<200, types.GetCurrenciesResponse200>> {
    return this.core.fetch('/lookups/currencies', 'get');
  }

  /**
   * Fetch all custom fields associated with contracts, providing additional data necessary
   * for contract management.
   *  **Token scopes**: `contracts:read`
   *
   * @summary List all custom fields
   * @throws FetchError<400, types.GetCustomFieldsFromContractsResponse400> Operation failed.
   * @throws FetchError<401, types.GetCustomFieldsFromContractsResponse401> Operation failed.
   * @throws FetchError<403, types.GetCustomFieldsFromContractsResponse403> Operation failed.
   * @throws FetchError<404, types.GetCustomFieldsFromContractsResponse404> Operation failed.
   * @throws FetchError<500, types.GetCustomFieldsFromContractsResponse500> Operation failed.
   */
  getCustomFieldsFromContracts(): Promise<FetchResponse<200, types.GetCustomFieldsFromContractsResponse200>> {
    return this.core.fetch('/contracts/custom_fields', 'get');
  }

  /**
   * Sign a contract as a client.
   *  **Token scopes**: `contracts:write`
   *
   * @summary Sign a contract
   * @throws FetchError<400, types.SignContractResponse400> Operation failed.
   * @throws FetchError<401, types.SignContractResponse401> Operation failed.
   * @throws FetchError<403, types.SignContractResponse403> Operation failed.
   * @throws FetchError<404, types.SignContractResponse404> Operation failed.
   * @throws FetchError<500, types.SignContractResponse500> Operation failed.
   */
  signContract(body: types.SignContractBodyParam, metadata: types.SignContractMetadataParam): Promise<FetchResponse<201, types.SignContractResponse201>> {
    return this.core.fetch('/contracts/{contract_id}/signatures', 'post', body, metadata);
  }

  /**
   * Retrieve a single off-cycle payment.
   *  **Token scopes**: `off-cycle-payments:read`
   *
   * @summary Retrieve a single off-cycle payment
   * @throws FetchError<400, types.GetOffCyclePaymentByContractAndIdResponse400> Operation failed.
   * @throws FetchError<401, types.GetOffCyclePaymentByContractAndIdResponse401> Operation failed.
   * @throws FetchError<403, types.GetOffCyclePaymentByContractAndIdResponse403> Operation failed.
   * @throws FetchError<404, types.GetOffCyclePaymentByContractAndIdResponse404> Operation failed.
   * @throws FetchError<500, types.GetOffCyclePaymentByContractAndIdResponse500> Operation failed.
   */
  getOffCyclePaymentByContractAndId(metadata: types.GetOffCyclePaymentByContractAndIdMetadataParam): Promise<FetchResponse<200, types.GetOffCyclePaymentByContractAndIdResponse200>> {
    return this.core.fetch('/contracts/{contract_id}/off-cycle-payments/{id}', 'get', metadata);
  }

  /**
   * Create child worker relation with external Id.
   *  **Token scopes**: `profile:write`
   *
   * @summary Create child worker relation with external Id
   * @throws FetchError<400, types.UpsertChildWorkerRelationsExternalIdResponse400> Operation failed.
   * @throws FetchError<401, types.UpsertChildWorkerRelationsExternalIdResponse401> Operation failed.
   * @throws FetchError<403, types.UpsertChildWorkerRelationsExternalIdResponse403> Operation failed.
   * @throws FetchError<404, types.UpsertChildWorkerRelationsExternalIdResponse404> Operation failed.
   * @throws FetchError<500, types.UpsertChildWorkerRelationsExternalIdResponse500> Operation failed.
   */
  upsertChildWorkerRelationsExternalId(body: types.UpsertChildWorkerRelationsExternalIdBodyParam, metadata: types.UpsertChildWorkerRelationsExternalIdMetadataParam): Promise<FetchResponse<204, types.UpsertChildWorkerRelationsExternalIdResponse204>> {
    return this.core.fetch('/hris/worker_relations/profile/external/{profileId}/child', 'put', body, metadata);
  }

  /**
   * Get verification method by provided country and document type
   *  **Token scopes**: `screenings:read`, `worker:read`
   *
   * @summary Get verification method
   * @throws FetchError<400, types.GetVerificationMethodResponse400> Operation failed.
   * @throws FetchError<401, types.GetVerificationMethodResponse401> Operation failed.
   * @throws FetchError<403, types.GetVerificationMethodResponse403> Operation failed.
   * @throws FetchError<404, types.GetVerificationMethodResponse404> Operation failed.
   * @throws FetchError<500, types.GetVerificationMethodResponse500> Operation failed.
   */
  getVerificationMethod(metadata: types.GetVerificationMethodMetadataParam): Promise<FetchResponse<200, types.GetVerificationMethodResponse200>> {
    return this.core.fetch('/screenings/verification-method', 'get', metadata);
  }

  /**
   * Create manual verification screening
   *  **Token scopes**: `worker:write`, `screenings:write`
   *
   * @summary Create manual verification screening
   * @throws FetchError<400, types.CreateManualVerificationScreeningResponse400> Operation failed.
   * @throws FetchError<401, types.CreateManualVerificationScreeningResponse401> Operation failed.
   * @throws FetchError<403, types.CreateManualVerificationScreeningResponse403> Operation failed.
   * @throws FetchError<404, types.CreateManualVerificationScreeningResponse404> Operation failed.
   * @throws FetchError<500, types.CreateManualVerificationScreeningResponse500> Operation failed.
   */
  createManualVerificationScreening(body: types.CreateManualVerificationScreeningBodyParam): Promise<FetchResponse<201, types.CreateManualVerificationScreeningResponse201>> {
    return this.core.fetch('/screenings/manual-verification', 'post', body);
  }

  /**
   * Get list of payslips for an EOR employee.
   *  **Token scopes**: `worker:read`
   *
   * @summary Get list of payslips for an EOR employee
   * @throws FetchError<400, types.GetEorEmployeePayslipsResponse400> Operation failed.
   * @throws FetchError<401, types.GetEorEmployeePayslipsResponse401> Operation failed.
   * @throws FetchError<403, types.GetEorEmployeePayslipsResponse403> Operation failed.
   * @throws FetchError<404, types.GetEorEmployeePayslipsResponse404> Operation failed.
   * @throws FetchError<500, types.GetEorEmployeePayslipsResponse500> Operation failed.
   */
  getEorEmployeePayslips(): Promise<FetchResponse<200, types.GetEorEmployeePayslipsResponse200>> {
    return this.core.fetch('/daas/payslips', 'get');
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { AcceptAmendmentClientMetadataParam, AcceptAmendmentClientResponse200, AcceptAmendmentClientResponse401, AcceptAmendmentClientResponse403, AcceptAmendmentEmployeeMetadataParam, AcceptAmendmentEmployeeResponse200, AcceptAmendmentEmployeeResponse401, AcceptAmendmentEmployeeResponse403, AddCandidateBodyParam, AddCandidateResponse201, AddCandidateResponse400, AddCandidateResponse401, AddCandidateResponse403, AddCandidateResponse404, AddCandidateResponse500, AddContractDocumentBodyParam, AddContractDocumentMetadataParam, AddContractDocumentResponse201, AddContractDocumentResponse400, AddContractDocumentResponse401, AddContractDocumentResponse403, AddContractDocumentResponse404, AddContractDocumentResponse500, AddEditBankDetailsBodyParam, AddEditBankDetailsResponse200, AddEditBankDetailsResponse400, AddEditBankDetailsResponse401, AddEditBankDetailsResponse403, AddEditBankDetailsResponse404, AddEditBankDetailsResponse500, AddEorBankAccountBodyParam, AddEorBankAccountResponse201, AddEorBankAccountResponse400, AddEorBankAccountResponse401, AddEorBankAccountResponse403, AddEorBankAccountResponse404, AddEorBankAccountResponse500, AddEorWorkerAdditionalInformationBodyParam, AddEorWorkerAdditionalInformationMetadataParam, AddEorWorkerAdditionalInformationResponse200, AddEorWorkerAdditionalInformationResponse400, AddEorWorkerAdditionalInformationResponse401, AddEorWorkerAdditionalInformationResponse403, AddEorWorkerAdditionalInformationResponse404, AddEorWorkerAdditionalInformationResponse500, AddGpBankAccountBodyParam, AddGpBankAccountMetadataParam, AddGpBankAccountResponse201, AddGpBankAccountResponse400, AddGpBankAccountResponse401, AddGpBankAccountResponse403, AddGpBankAccountResponse404, AddGpBankAccountResponse500, AmendContractDetailsBodyParam, AmendContractDetailsMetadataParam, AmendContractDetailsResponse201, AmendContractDetailsResponse400, AmendContractDetailsResponse401, AmendContractDetailsResponse403, AmendContractDetailsResponse404, AmendContractDetailsResponse500, ApplyChangesPositionsBodyParam, ApplyChangesPositionsResponse403, ApplyChangesPositionsResponse404, ApproveExerciseEquityBodyParam, ApproveExerciseEquityMetadataParam, ApproveExerciseEquityResponse200, ApproveExerciseEquityResponse400, ApproveExerciseEquityResponse401, ApproveExerciseEquityResponse403, ApproveExerciseEquityResponse404, ApproveExerciseEquityResponse500, ApproveRejectTimeOffRequestsBodyParam, ApproveRejectTimeOffRequestsResponse200, ApproveRejectTimeOffRequestsResponse400, ApproveRejectTimeOffRequestsResponse401, ApproveRejectTimeOffRequestsResponse403, ApproveRejectTimeOffRequestsResponse404, ApproveRejectTimeOffRequestsResponse500, CalculateEorEmploymentCostBodyParam, CalculateEorEmploymentCostResponse200, CalculateEorEmploymentCostResponse400, CalculateEorEmploymentCostResponse401, CalculateEorEmploymentCostResponse403, CalculateEorEmploymentCostResponse404, CalculateEorEmploymentCostResponse500, CancelAmendmentMetadataParam, CancelAmendmentResponse200, CancelAmendmentResponse401, CancelAmendmentResponse403, CancelEorContractBodyParam, CancelEorContractMetadataParam, CancelEorContractResponse400, CancelEorContractResponse401, CancelEorContractResponse403, CancelEorContractResponse404, CancelEorContractResponse500, CheckVisaRequirementMetadataParam, CheckVisaRequirementResponse200, CheckVisaRequirementResponse400, CheckVisaRequirementResponse401, CheckVisaRequirementResponse403, CheckVisaRequirementResponse404, CheckVisaRequirementResponse500, CleanUpPlanMetadataParam, CleanUpPlanResponse202, CleanUpPlanResponse400, CleanUpPlanResponse401, CleanUpPlanResponse403, CleanUpPlanResponse404, CleanUpPlanResponse500, ConfirmAmendmentMetadataParam, ConfirmAmendmentResponse200, ConfirmAmendmentResponse401, ConfirmAmendmentResponse403, CreateAdjustmentBodyParam, CreateAdjustmentResponse201, CreateAdjustmentResponse400, CreateAdjustmentResponse401, CreateAdjustmentResponse403, CreateAdjustmentResponse404, CreateAdjustmentResponse500, CreateBackgroundCheckForContractsBodyParam, CreateBackgroundCheckForContractsResponse201, CreateBackgroundCheckForContractsResponse400, CreateBackgroundCheckForContractsResponse401, CreateBackgroundCheckForContractsResponse403, CreateBackgroundCheckForContractsResponse404, CreateBackgroundCheckForContractsResponse500, CreateBankTransferMethodBodyParam, CreateBankTransferMethodResponse201, CreateBankTransferMethodResponse400, CreateBankTransferMethodResponse401, CreateBankTransferMethodResponse403, CreateBankTransferMethodResponse404, CreateBankTransferMethodResponse500, CreateBenefitProviderIntegrationClientMetadataParam, CreateBenefitProviderIntegrationClientResponse200, CreateBenefitProviderIntegrationClientResponse400, CreateBenefitProviderIntegrationClientResponse401, CreateBenefitProviderIntegrationClientResponse403, CreateBenefitProviderIntegrationClientResponse404, CreateBenefitProviderIntegrationClientResponse500, CreateCaseBodyParam, CreateCaseResponse201, CreateCaseResponse400, CreateCaseResponse401, CreateCaseResponse403, CreateCaseResponse404, CreateCaseResponse500, CreateConsentTokenBodyParam, CreateConsentTokenResponse201, CreateConsentTokenResponse400, CreateConsentTokenResponse401, CreateConsentTokenResponse403, CreateConsentTokenResponse404, CreateConsentTokenResponse500, CreateContractBodyParam, CreateContractPgoTakBodyParam, CreateContractPgoTakMetadataParam, CreateContractPgoTakResponse201, CreateContractPgoTakResponse400, CreateContractPgoTakResponse401, CreateContractPgoTakResponse403, CreateContractPgoTakResponse404, CreateContractPgoTakResponse500, CreateContractResponse201, CreateContractResponse400, CreateContractResponse401, CreateContractResponse403, CreateContractResponse404, CreateContractResponse500, CreateDirectEmployeeBodyParam, CreateDirectEmployeeResponse201, CreateDirectEmployeeResponse400, CreateDirectEmployeeResponse401, CreateDirectEmployeeResponse403, CreateDirectEmployeeResponse404, CreateDirectEmployeeResponse500, CreateEorContractBodyParam, CreateEorContractResponse200, CreateEorContractResponse400, CreateEorContractResponse401, CreateEorContractResponse403, CreateEorContractResponse404, CreateEorContractResponse500, CreateEorWorkerBodyParam, CreateEorWorkerResponse200, CreateEorWorkerResponse400, CreateEorWorkerResponse401, CreateEorWorkerResponse403, CreateEorWorkerResponse404, CreateEorWorkerResponse500, CreateGpContractBodyParam, CreateGpContractResponse201, CreateGpContractResponse400, CreateGpContractResponse401, CreateGpContractResponse403, CreateGpContractResponse404, CreateGpContractResponse500, CreateGroupBodyParam, CreateGroupResponse200, CreateGroupResponse400, CreateGroupResponse401, CreateGroupResponse403, CreateGroupResponse404, CreateGroupResponse500, CreateHourlyReportPresetBodyParam, CreateHourlyReportPresetResponse201, CreateHourlyReportPresetResponse400, CreateHourlyReportPresetResponse401, CreateHourlyReportPresetResponse403, CreateHourlyReportPresetResponse404, CreateHourlyReportPresetResponse500, CreateHourlyReportRootPresetBodyParam, CreateHourlyReportRootPresetResponse200, CreateHourlyReportRootPresetResponse400, CreateHourlyReportRootPresetResponse401, CreateHourlyReportRootPresetResponse403, CreateHourlyReportRootPresetResponse404, CreateHourlyReportRootPresetResponse500, CreateInvoiceAdjustmentBodyParam, CreateInvoiceAdjustmentMetadataParam, CreateInvoiceAdjustmentResponse201, CreateInvoiceAdjustmentResponse400, CreateInvoiceAdjustmentResponse401, CreateInvoiceAdjustmentResponse403, CreateInvoiceAdjustmentResponse404, CreateInvoiceAdjustmentResponse500, CreateLegalEntityBodyParam, CreateLegalEntityResponse200, CreateLegalEntityResponse400, CreateLegalEntityResponse401, CreateLegalEntityResponse403, CreateLegalEntityResponse404, CreateLegalEntityResponse500, CreateManagerBodyParam, CreateManagerResponse201, CreateManagerResponse400, CreateManagerResponse401, CreateManagerResponse403, CreateManagerResponse404, CreateManagerResponse409, CreateManagerResponse500, CreateManualVerificationScreeningBodyParam, CreateManualVerificationScreeningResponse201, CreateManualVerificationScreeningResponse400, CreateManualVerificationScreeningResponse401, CreateManualVerificationScreeningResponse403, CreateManualVerificationScreeningResponse404, CreateManualVerificationScreeningResponse500, CreateMilestoneBodyParam, CreateMilestoneMetadataParam, CreateMilestoneResponse201, CreateMilestoneResponse400, CreateMilestoneResponse401, CreateMilestoneResponse403, CreateMilestoneResponse404, CreateMilestoneResponse500, CreateOffCyclePaymentBodyParam, CreateOffCyclePaymentMetadataParam, CreateOffCyclePaymentResponse201, CreateOffCyclePaymentResponse400, CreateOffCyclePaymentResponse401, CreateOffCyclePaymentResponse403, CreateOffCyclePaymentResponse404, CreateOffCyclePaymentResponse500, CreateOrUpdateParentRelationBetweenProfilesBodyParam, CreateOrUpdateParentRelationBetweenProfilesMetadataParam, CreateOrUpdateParentRelationBetweenProfilesResponse204, CreateOrUpdateParentRelationBetweenProfilesResponse400, CreateOrUpdateParentRelationBetweenProfilesResponse401, CreateOrUpdateParentRelationBetweenProfilesResponse403, CreateOrUpdateParentRelationBetweenProfilesResponse404, CreateOrUpdateParentRelationBetweenProfilesResponse500, CreateOrgStructureBodyParam, CreateOrgStructureResponse200, CreateOrgStructureResponse400, CreateOrgStructureResponse401, CreateOrgStructureResponse403, CreateOrgStructureResponse404, CreateOrgStructureResponse500, CreateOrganizationRoleBodyParam, CreateOrganizationRoleResponse200, CreateOrganizationRoleResponse400, CreateOrganizationRoleResponse401, CreateOrganizationRoleResponse403, CreateOrganizationRoleResponse404, CreateOrganizationRoleResponse500, CreateShiftRateBodyParam, CreateShiftRateResponse201, CreateShiftRateResponse400, CreateShiftRateResponse401, CreateShiftRateResponse403, CreateShiftRateResponse404, CreateShiftRateResponse409, CreateShiftRateResponse500, CreateShiftsBodyParam, CreateShiftsResponse201, CreateShiftsResponse400, CreateShiftsResponse401, CreateShiftsResponse403, CreateShiftsResponse404, CreateShiftsResponse500, CreateTaskManyReviewBodyParam, CreateTaskManyReviewMetadataParam, CreateTaskManyReviewResponse201, CreateTaskManyReviewResponse400, CreateTaskManyReviewResponse401, CreateTaskManyReviewResponse403, CreateTaskManyReviewResponse404, CreateTaskManyReviewResponse500, CreateTaskReviewByIdBodyParam, CreateTaskReviewByIdMetadataParam, CreateTaskReviewByIdResponse201, CreateTaskReviewByIdResponse400, CreateTaskReviewByIdResponse401, CreateTaskReviewByIdResponse403, CreateTaskReviewByIdResponse404, CreateTaskReviewByIdResponse500, CreateTimeOffBodyParam, CreateTimeOffResponse201, CreateTimeOffResponse400, CreateTimeOffResponse401, CreateTimeOffResponse403, CreateTimeOffResponse404, CreateTimeOffResponse500, CreateTimesheetBodyParam, CreateTimesheetResponse201, CreateTimesheetResponse400, CreateTimesheetResponse401, CreateTimesheetResponse403, CreateTimesheetResponse404, CreateTimesheetResponse500, CreateTimesheetReviewBodyParam, CreateTimesheetReviewMetadataParam, CreateTimesheetReviewResponse201, CreateTimesheetReviewResponse400, CreateTimesheetReviewResponse401, CreateTimesheetReviewResponse403, CreateTimesheetReviewResponse404, CreateTimesheetReviewResponse500, CreateVeriffSessionBodyParam, CreateVeriffSessionResponse201, CreateVeriffSessionResponse400, CreateVeriffSessionResponse401, CreateVeriffSessionResponse403, CreateVeriffSessionResponse404, CreateVeriffSessionResponse500, CreateWebhookBodyParam, CreateWebhookResponse201, CreateWebhookResponse400, CreateWebhookResponse401, CreateWebhookResponse403, CreateWebhookResponse404, CreateWebhookResponse405, CreateWebhookResponse429, CreateWebhookResponse500, CreateWorkerBodyParam, CreateWorkerRelationBodyParam, CreateWorkerRelationExternalIdBodyParam, CreateWorkerRelationExternalIdResponse201, CreateWorkerRelationExternalIdResponse400, CreateWorkerRelationExternalIdResponse401, CreateWorkerRelationExternalIdResponse403, CreateWorkerRelationExternalIdResponse404, CreateWorkerRelationExternalIdResponse500, CreateWorkerRelationResponse201, CreateWorkerRelationResponse400, CreateWorkerRelationResponse401, CreateWorkerRelationResponse403, CreateWorkerRelationResponse404, CreateWorkerRelationResponse500, CreateWorkerRelationTypeBodyParam, CreateWorkerRelationTypeResponse201, CreateWorkerRelationTypeResponse400, CreateWorkerRelationTypeResponse401, CreateWorkerRelationTypeResponse403, CreateWorkerRelationTypeResponse404, CreateWorkerRelationTypeResponse500, CreateWorkerResponse201, CreateWorkerResponse400, CreateWorkerResponse401, CreateWorkerResponse403, CreateWorkerResponse404, CreateWorkerResponse500, DaasSignEmployeeContractBodyParam, DaasSignEmployeeContractMetadataParam, DaasSignEmployeeContractResponse201, DaasSignEmployeeContractResponse400, DaasSignEmployeeContractResponse401, DaasSignEmployeeContractResponse403, DaasSignEmployeeContractResponse404, DaasSignEmployeeContractResponse500, DelayEorEmployeeOnboardingBodyParam, DelayEorEmployeeOnboardingMetadataParam, DelayEorEmployeeOnboardingResponse200, DelayEorEmployeeOnboardingResponse400, DelayEorEmployeeOnboardingResponse401, DelayEorEmployeeOnboardingResponse403, DelayEorEmployeeOnboardingResponse404, DelayEorEmployeeOnboardingResponse500, Delete401KEnrollmentsDefinitionBodyParam, Delete401KEnrollmentsDefinitionMetadataParam, Delete401KEnrollmentsDefinitionResponse204, Delete401KEnrollmentsDefinitionResponse400, Delete401KEnrollmentsDefinitionResponse401, Delete401KEnrollmentsDefinitionResponse403, Delete401KEnrollmentsDefinitionResponse404, Delete401KEnrollmentsDefinitionResponse500, Delete401KPlanDefinitionMetadataParam, Delete401KPlanDefinitionResponse204, Delete401KPlanDefinitionResponse400, Delete401KPlanDefinitionResponse401, Delete401KPlanDefinitionResponse403, Delete401KPlanDefinitionResponse404, Delete401KPlanDefinitionResponse500, DeleteAdjustmentMetadataParam, DeleteAdjustmentResponse200, DeleteAdjustmentResponse400, DeleteAdjustmentResponse401, DeleteAdjustmentResponse403, DeleteAdjustmentResponse404, DeleteAdjustmentResponse500, DeleteBankDetailsMetadataParam, DeleteBankDetailsResponse400, DeleteBankDetailsResponse401, DeleteBankDetailsResponse403, DeleteBankDetailsResponse404, DeleteBankDetailsResponse500, DeleteContractCustomFieldMetadataParam, DeleteContractCustomFieldResponse400, DeleteContractCustomFieldResponse401, DeleteContractCustomFieldResponse403, DeleteContractCustomFieldResponse404, DeleteContractCustomFieldResponse500, DeleteContractTaskByIdMetadataParam, DeleteContractTaskByIdResponse200, DeleteContractTaskByIdResponse401, DeleteContractTaskByIdResponse500, DeleteCustomFieldValueFromWorkerMetadataParam, DeleteCustomFieldValueFromWorkerResponse400, DeleteCustomFieldValueFromWorkerResponse401, DeleteCustomFieldValueFromWorkerResponse403, DeleteCustomFieldValueFromWorkerResponse500, DeleteGroupMetadataParam, DeleteGroupResponse200, DeleteGroupResponse400, DeleteGroupResponse401, DeleteGroupResponse403, DeleteGroupResponse404, DeleteGroupResponse500, DeleteHourlyReportPresetMetadataParam, DeleteHourlyReportPresetResponse200, DeleteHourlyReportPresetResponse400, DeleteHourlyReportPresetResponse401, DeleteHourlyReportPresetResponse403, DeleteHourlyReportPresetResponse404, DeleteHourlyReportPresetResponse500, DeleteInvoiceAdjustmentMetadataParam, DeleteInvoiceAdjustmentResponse200, DeleteInvoiceAdjustmentResponse400, DeleteInvoiceAdjustmentResponse401, DeleteInvoiceAdjustmentResponse403, DeleteInvoiceAdjustmentResponse404, DeleteInvoiceAdjustmentResponse500, DeleteLegalEntityMetadataParam, DeleteLegalEntityResponse200, DeleteLegalEntityResponse400, DeleteLegalEntityResponse401, DeleteLegalEntityResponse403, DeleteLegalEntityResponse404, DeleteLegalEntityResponse500, DeleteMilestoneByIdMetadataParam, DeleteMilestoneByIdResponse200, DeleteMilestoneByIdResponse400, DeleteMilestoneByIdResponse401, DeleteMilestoneByIdResponse403, DeleteMilestoneByIdResponse404, DeleteMilestoneByIdResponse500, DeleteOrgStructureByExternalIdMetadataParam, DeleteOrgStructureByExternalIdResponse200, DeleteOrgStructureByExternalIdResponse400, DeleteOrgStructureByExternalIdResponse401, DeleteOrgStructureByExternalIdResponse403, DeleteOrgStructureByExternalIdResponse404, DeleteOrgStructureByExternalIdResponse500, DeleteOrgStructureMetadataParam, DeleteOrgStructureResponse200, DeleteOrgStructureResponse400, DeleteOrgStructureResponse401, DeleteOrgStructureResponse403, DeleteOrgStructureResponse404, DeleteOrgStructureResponse500, DeleteShiftExternalIdMetadataParam, DeleteShiftExternalIdResponse400, DeleteShiftExternalIdResponse401, DeleteShiftExternalIdResponse403, DeleteShiftExternalIdResponse404, DeleteShiftExternalIdResponse500, DeleteShiftRateExternalIdMetadataParam, DeleteShiftRateExternalIdResponse400, DeleteShiftRateExternalIdResponse401, DeleteShiftRateExternalIdResponse403, DeleteShiftRateExternalIdResponse404, DeleteShiftRateExternalIdResponse500, DeleteTimeOffMetadataParam, DeleteTimeOffResponse204, DeleteTimeOffResponse400, DeleteTimeOffResponse401, DeleteTimeOffResponse403, DeleteTimeOffResponse404, DeleteTimeOffResponse500, DeleteTimesheetByIdMetadataParam, DeleteTimesheetByIdResponse200, DeleteTimesheetByIdResponse400, DeleteTimesheetByIdResponse401, DeleteTimesheetByIdResponse403, DeleteTimesheetByIdResponse404, DeleteTimesheetByIdResponse500, DeleteWorkerRelationExternalIdMetadataParam, DeleteWorkerRelationExternalIdResponse400, DeleteWorkerRelationExternalIdResponse401, DeleteWorkerRelationExternalIdResponse403, DeleteWorkerRelationExternalIdResponse404, DeleteWorkerRelationExternalIdResponse500, DeleteWorkerRelationMetadataParam, DeleteWorkerRelationResponse400, DeleteWorkerRelationResponse401, DeleteWorkerRelationResponse403, DeleteWorkerRelationResponse404, DeleteWorkerRelationResponse500, DeleteWorkerRelationTypeExternalIdMetadataParam, DeleteWorkerRelationTypeExternalIdResponse204, DeleteWorkerRelationTypeExternalIdResponse400, DeleteWorkerRelationTypeExternalIdResponse401, DeleteWorkerRelationTypeExternalIdResponse403, DeleteWorkerRelationTypeExternalIdResponse404, DeleteWorkerRelationTypeExternalIdResponse500, DeleteWorkerRelationTypeMetadataParam, DeleteWorkerRelationTypeResponse400, DeleteWorkerRelationTypeResponse401, DeleteWorkerRelationTypeResponse403, DeleteWorkerRelationTypeResponse404, DeleteWorkerRelationTypeResponse500, DownloadEmployeeAgreementPdfMetadataParam, DownloadEmployeeAgreementPdfResponse200, DownloadEmployeeAgreementPdfResponse400, DownloadEmployeeAgreementPdfResponse401, DownloadEmployeeAgreementPdfResponse403, DownloadEmployeeAgreementPdfResponse404, DownloadEmployeeAgreementPdfResponse500, DownloadGrossToNetReportMetadataParam, DownloadGrossToNetReportResponse200, DownloadGrossToNetReportResponse400, DownloadGrossToNetReportResponse401, DownloadGrossToNetReportResponse403, DownloadGrossToNetReportResponse404, DownloadGrossToNetReportResponse500, DownloadPdfClientAndEmployeeSideMetadataParam, DownloadPdfClientAndEmployeeSideResponse200, DownloadPdfClientAndEmployeeSideResponse401, DownloadPdfClientAndEmployeeSideResponse403, DynamicRequirementsBodyParam, DynamicRequirementsResponse200, DynamicRequirementsResponse400, DynamicRequirementsResponse401, DynamicRequirementsResponse403, DynamicRequirementsResponse404, DynamicRequirementsResponse500, EditGroupBodyParam, EditGroupMetadataParam, EditGroupResponse200, EditGroupResponse400, EditGroupResponse401, EditGroupResponse403, EditGroupResponse404, EditGroupResponse500, EditLegalEntityBodyParam, EditLegalEntityMetadataParam, EditLegalEntityResponse200, EditLegalEntityResponse400, EditLegalEntityResponse401, EditLegalEntityResponse403, EditLegalEntityResponse404, EditLegalEntityResponse500, EmployeeAdditionalInfoTemplateMetadataParam, EmployeeAdditionalInfoTemplateResponse200, EmployeeAdditionalInfoTemplateResponse400, EmployeeAdditionalInfoTemplateResponse401, EmployeeAdditionalInfoTemplateResponse403, EmployeeAdditionalInfoTemplateResponse404, EmployeeAdditionalInfoTemplateResponse500, EorResignationRequestBodyParam, EorResignationRequestMetadataParam, EorResignationRequestResponse200, EorResignationRequestResponse400, EorResignationRequestResponse401, EorResignationRequestResponse403, EorResignationRequestResponse404, EorResignationRequestResponse500, EorTerminationRequestBodyParam, EorTerminationRequestMetadataParam, EorTerminationRequestResponse200, EorTerminationRequestResponse400, EorTerminationRequestResponse401, EorTerminationRequestResponse403, EorTerminationRequestResponse404, EorTerminationRequestResponse500, EquityTaxEventsBodyParam, EquityTaxEventsResponse201, EquityTaxEventsResponse400, EquityTaxEventsResponse401, EquityTaxEventsResponse403, EquityTaxEventsResponse404, EquityTaxEventsResponse500, ExternalIdBodyParam, ExternalIdMetadataParam, ExternalIdResponse200, ExternalIdResponse400, ExternalIdResponse401, ExternalIdResponse403, ExternalIdResponse404, ExternalIdResponse500, FetchEorContractFormMetadataParam, FetchEorContractFormResponse200, FetchEorContractFormResponse400, FetchEorContractFormResponse401, FetchEorContractFormResponse403, FetchEorContractFormResponse404, FetchEorContractFormResponse500, Get401KEnrollmentsDefinitionMetadataParam, Get401KEnrollmentsDefinitionResponse200, Get401KEnrollmentsDefinitionResponse400, Get401KEnrollmentsDefinitionResponse401, Get401KEnrollmentsDefinitionResponse403, Get401KEnrollmentsDefinitionResponse404, Get401KEnrollmentsDefinitionResponse500, Get401KPlansDefinitionMetadataParam, Get401KPlansDefinitionResponse200, Get401KPlansDefinitionResponse400, Get401KPlansDefinitionResponse401, Get401KPlansDefinitionResponse403, Get401KPlansDefinitionResponse404, Get401KPlansDefinitionResponse500, GetAdjustmentsByIdMetadataParam, GetAdjustmentsByIdResponse200, GetAdjustmentsByIdResponse400, GetAdjustmentsByIdResponse401, GetAdjustmentsByIdResponse403, GetAdjustmentsByIdResponse404, GetAdjustmentsByIdResponse500, GetAdjustmentsMetadataParam, GetAdjustmentsResponse200, GetAdjustmentsResponse400, GetAdjustmentsResponse401, GetAdjustmentsResponse403, GetAdjustmentsResponse404, GetAdjustmentsResponse500, GetAllAmendmentsMetadataParam, GetAllAmendmentsResponse200, GetAllAmendmentsResponse401, GetAllAmendmentsResponse403, GetAllOrgStructuresMetadataParam, GetAllOrgStructuresResponse200, GetAllOrgStructuresResponse400, GetAllOrgStructuresResponse401, GetAllOrgStructuresResponse403, GetAllOrgStructuresResponse404, GetAllOrgStructuresResponse500, GetAllProfileWorkerRelationsExternalIdMetadataParam, GetAllProfileWorkerRelationsExternalIdResponse200, GetAllProfileWorkerRelationsExternalIdResponse400, GetAllProfileWorkerRelationsExternalIdResponse401, GetAllProfileWorkerRelationsExternalIdResponse403, GetAllProfileWorkerRelationsExternalIdResponse404, GetAllProfileWorkerRelationsExternalIdResponse500, GetAllProfileWorkerRelationsMetadataParam, GetAllProfileWorkerRelationsResponse200, GetAllProfileWorkerRelationsResponse400, GetAllProfileWorkerRelationsResponse401, GetAllProfileWorkerRelationsResponse403, GetAllProfileWorkerRelationsResponse404, GetAllProfileWorkerRelationsResponse500, GetAllWebhookEventTypesResponse200, GetAllWebhookEventTypesResponse400, GetAllWebhookEventTypesResponse401, GetAllWebhookEventTypesResponse403, GetAllWebhookEventTypesResponse404, GetAllWebhookEventTypesResponse405, GetAllWebhookEventTypesResponse429, GetAllWebhookEventTypesResponse500, GetAllWebhooksResponse200, GetAllWebhooksResponse400, GetAllWebhooksResponse401, GetAllWebhooksResponse403, GetAllWebhooksResponse404, GetAllWebhooksResponse405, GetAllWebhooksResponse429, GetAllWebhooksResponse500, GetAllWorkerRelationTypesResponse200, GetAllWorkerRelationTypesResponse400, GetAllWorkerRelationTypesResponse401, GetAllWorkerRelationTypesResponse403, GetAllWorkerRelationTypesResponse404, GetAllWorkerRelationTypesResponse500, GetBackgroundChecksByContractIdMetadataParam, GetBackgroundChecksByContractIdResponse200, GetBackgroundChecksByContractIdResponse400, GetBackgroundChecksByContractIdResponse401, GetBackgroundChecksByContractIdResponse403, GetBackgroundChecksByContractIdResponse404, GetBackgroundChecksByContractIdResponse500, GetBackgroundChecksOptionsMetadataParam, GetBackgroundChecksOptionsResponse200, GetBackgroundChecksOptionsResponse400, GetBackgroundChecksOptionsResponse401, GetBackgroundChecksOptionsResponse403, GetBackgroundChecksOptionsResponse404, GetBackgroundChecksOptionsResponse500, GetBankDetailsResponse200, GetBankDetailsResponse400, GetBankDetailsResponse401, GetBankDetailsResponse403, GetBankDetailsResponse404, GetBankDetailsResponse500, GetBankTransferRequirementsMetadataParam, GetBankTransferRequirementsResponse200, GetBankTransferRequirementsResponse400, GetBankTransferRequirementsResponse401, GetBankTransferRequirementsResponse403, GetBankTransferRequirementsResponse404, GetBankTransferRequirementsResponse500, GetBankTransferSupportedRoutesResponse200, GetBankTransferSupportedRoutesResponse400, GetBankTransferSupportedRoutesResponse401, GetBankTransferSupportedRoutesResponse403, GetBankTransferSupportedRoutesResponse404, GetBankTransferSupportedRoutesResponse500, GetBenefitEmployeeMetadataParam, GetBenefitEmployeeResponse200, GetBenefitEmployeeResponse400, GetBenefitEmployeeResponse401, GetBenefitEmployeeResponse403, GetBenefitEmployeeResponse404, GetBenefitEmployeeResponse500, GetBenefitEmployeesMetadataParam, GetBenefitEmployeesResponse200, GetBenefitEmployeesResponse400, GetBenefitEmployeesResponse401, GetBenefitEmployeesResponse403, GetBenefitEmployeesResponse404, GetBenefitEmployeesResponse500, GetBenefitPaystubsMetadataParam, GetBenefitPaystubsResponse200, GetBenefitPaystubsResponse400, GetBenefitPaystubsResponse401, GetBenefitPaystubsResponse403, GetBenefitPaystubsResponse404, GetBenefitPaystubsResponse500, GetBillingInvoiceDownloadLinkMetadataParam, GetBillingInvoiceDownloadLinkResponse200, GetBillingInvoiceDownloadLinkResponse400, GetBillingInvoiceDownloadLinkResponse401, GetBillingInvoiceDownloadLinkResponse403, GetBillingInvoiceDownloadLinkResponse404, GetBillingInvoiceDownloadLinkResponse500, GetCategoriesResponse200, GetCategoriesResponse400, GetCategoriesResponse401, GetCategoriesResponse403, GetCategoriesResponse404, GetCategoriesResponse500, GetConsentResponse200, GetConsentResponse400, GetConsentResponse401, GetConsentResponse403, GetConsentResponse404, GetConsentResponse500, GetContractByIdMetadataParam, GetContractByIdResponse200, GetContractByIdResponse400, GetContractByIdResponse401, GetContractByIdResponse403, GetContractByIdResponse404, GetContractByIdResponse500, GetContractEquityWithholdingAmountMetadataParam, GetContractEquityWithholdingAmountResponse200, GetContractEquityWithholdingAmountResponse400, GetContractEquityWithholdingAmountResponse401, GetContractEquityWithholdingAmountResponse403, GetContractEquityWithholdingAmountResponse404, GetContractEquityWithholdingAmountResponse500, GetContractListMetadataParam, GetContractListResponse200, GetContractListResponse400, GetContractListResponse401, GetContractListResponse403, GetContractListResponse404, GetContractListResponse500, GetContractPaymentDatesMetadataParam, GetContractPaymentDatesResponse200, GetContractPaymentDatesResponse400, GetContractPaymentDatesResponse401, GetContractPaymentDatesResponse403, GetContractPaymentDatesResponse404, GetContractPaymentDatesResponse500, GetContractPreviewMetadataParam, GetContractPreviewResponse200, GetContractPreviewResponse400, GetContractPreviewResponse401, GetContractPreviewResponse403, GetContractPreviewResponse404, GetContractPreviewResponse500, GetContractTemplatesResponse200, GetContractTemplatesResponse400, GetContractTemplatesResponse401, GetContractTemplatesResponse403, GetContractTemplatesResponse404, GetContractTemplatesResponse500, GetCountriesResponse200, GetCountriesResponse400, GetCountriesResponse401, GetCountriesResponse403, GetCountriesResponse404, GetCountriesResponse500, GetCurrenciesResponse200, GetCurrenciesResponse400, GetCurrenciesResponse401, GetCurrenciesResponse403, GetCurrenciesResponse404, GetCurrenciesResponse500, GetCustomFieldFromContractsByIdMetadataParam, GetCustomFieldFromContractsByIdResponse200, GetCustomFieldFromContractsByIdResponse400, GetCustomFieldFromContractsByIdResponse401, GetCustomFieldFromContractsByIdResponse403, GetCustomFieldFromContractsByIdResponse404, GetCustomFieldFromContractsByIdResponse500, GetCustomFieldFromPeopleByIdMetadataParam, GetCustomFieldFromPeopleByIdResponse200, GetCustomFieldFromPeopleByIdResponse400, GetCustomFieldFromPeopleByIdResponse401, GetCustomFieldFromPeopleByIdResponse403, GetCustomFieldFromPeopleByIdResponse404, GetCustomFieldFromPeopleByIdResponse500, GetCustomFieldValuesFromContractMetadataParam, GetCustomFieldValuesFromContractResponse200, GetCustomFieldValuesFromContractResponse400, GetCustomFieldValuesFromContractResponse401, GetCustomFieldValuesFromContractResponse403, GetCustomFieldValuesFromContractResponse500, GetCustomFieldValuesFromWorkerMetadataParam, GetCustomFieldValuesFromWorkerResponse200, GetCustomFieldValuesFromWorkerResponse400, GetCustomFieldValuesFromWorkerResponse401, GetCustomFieldValuesFromWorkerResponse403, GetCustomFieldValuesFromWorkerResponse404, GetCustomFieldValuesFromWorkerResponse500, GetCustomFieldsFromContractsResponse200, GetCustomFieldsFromContractsResponse400, GetCustomFieldsFromContractsResponse401, GetCustomFieldsFromContractsResponse403, GetCustomFieldsFromContractsResponse404, GetCustomFieldsFromContractsResponse500, GetCustomFieldsFromPeopleResponse200, GetCustomFieldsFromPeopleResponse400, GetCustomFieldsFromPeopleResponse401, GetCustomFieldsFromPeopleResponse403, GetCustomFieldsFromPeopleResponse404, GetCustomFieldsFromPeopleResponse500, GetDaasHrVerificationLettersAndDocumentsMetadataParam, GetDaasHrVerificationLettersAndDocumentsResponse200, GetDaasHrVerificationLettersAndDocumentsResponse400, GetDaasHrVerificationLettersAndDocumentsResponse401, GetDaasHrVerificationLettersAndDocumentsResponse403, GetDaasHrVerificationLettersAndDocumentsResponse404, GetDaasHrVerificationLettersAndDocumentsResponse500, GetDaasOfferLetterPreviewMetadataParam, GetDaasOfferLetterPreviewResponse200, GetDaasOfferLetterPreviewResponse400, GetDaasOfferLetterPreviewResponse401, GetDaasOfferLetterPreviewResponse403, GetDaasOfferLetterPreviewResponse404, GetDaasOfferLetterPreviewResponse500, GetDepartmentsResponse200, GetDepartmentsResponse400, GetDepartmentsResponse401, GetDepartmentsResponse403, GetDepartmentsResponse404, GetDepartmentsResponse500, GetDownloadUrlForGpPayslipMetadataParam, GetDownloadUrlForGpPayslipResponse200, GetDownloadUrlForGpPayslipResponse400, GetDownloadUrlForGpPayslipResponse401, GetDownloadUrlForGpPayslipResponse403, GetDownloadUrlForGpPayslipResponse404, GetDownloadUrlForGpPayslipResponse500, GetEorAdditionalCostsMetadataParam, GetEorAdditionalCostsResponse200, GetEorAdditionalCostsResponse400, GetEorAdditionalCostsResponse401, GetEorAdditionalCostsResponse403, GetEorAdditionalCostsResponse404, GetEorAdditionalCostsResponse500, GetEorBankAccountGuideResponse200, GetEorBankAccountGuideResponse400, GetEorBankAccountGuideResponse401, GetEorBankAccountGuideResponse403, GetEorBankAccountGuideResponse404, GetEorBankAccountGuideResponse500, GetEorContractBenefitsMetadataParam, GetEorContractBenefitsResponse200, GetEorContractBenefitsResponse400, GetEorContractBenefitsResponse401, GetEorContractBenefitsResponse403, GetEorContractBenefitsResponse404, GetEorContractBenefitsResponse500, GetEorCountryValidationsMetadataParam, GetEorCountryValidationsResponse200, GetEorCountryValidationsResponse400, GetEorCountryValidationsResponse401, GetEorCountryValidationsResponse403, GetEorCountryValidationsResponse404, GetEorCountryValidationsResponse500, GetEorEmployeeComplianceDocumentTemplateMetadataParam, GetEorEmployeeComplianceDocumentTemplateResponse200, GetEorEmployeeComplianceDocumentTemplateResponse400, GetEorEmployeeComplianceDocumentTemplateResponse401, GetEorEmployeeComplianceDocumentTemplateResponse403, GetEorEmployeeComplianceDocumentTemplateResponse404, GetEorEmployeeComplianceDocumentTemplateResponse500, GetEorEmployeeComplianceDocumentsResponse200, GetEorEmployeeComplianceDocumentsResponse400, GetEorEmployeeComplianceDocumentsResponse401, GetEorEmployeeComplianceDocumentsResponse403, GetEorEmployeeComplianceDocumentsResponse404, GetEorEmployeeComplianceDocumentsResponse500, GetEorEmployeePayslipsResponse200, GetEorEmployeePayslipsResponse400, GetEorEmployeePayslipsResponse401, GetEorEmployeePayslipsResponse403, GetEorEmployeePayslipsResponse404, GetEorEmployeePayslipsResponse500, GetEorEmployeeTaxDocumentsResponse200, GetEorEmployeeTaxDocumentsResponse400, GetEorEmployeeTaxDocumentsResponse401, GetEorEmployeeTaxDocumentsResponse403, GetEorEmployeeTaxDocumentsResponse404, GetEorEmployeeTaxDocumentsResponse500, GetEorTerminationMetadataParam, GetEorTerminationResponse200, GetEorTerminationResponse400, GetEorTerminationResponse401, GetEorTerminationResponse403, GetEorTerminationResponse404, GetEorTerminationResponse500, GetEorWorkerPayslipDownloadUrlMetadataParam, GetEorWorkerPayslipDownloadUrlResponse200, GetEorWorkerPayslipDownloadUrlResponse400, GetEorWorkerPayslipDownloadUrlResponse401, GetEorWorkerPayslipDownloadUrlResponse403, GetEorWorkerPayslipDownloadUrlResponse404, GetEorWorkerPayslipDownloadUrlResponse500, GetEorWorkerPayslipsMetadataParam, GetEorWorkerPayslipsResponse200, GetEorWorkerPayslipsResponse400, GetEorWorkerPayslipsResponse401, GetEorWorkerPayslipsResponse403, GetEorWorkerPayslipsResponse404, GetEorWorkerPayslipsResponse500, GetGpBankAccountsMetadataParam, GetGpBankAccountsResponse200, GetGpBankAccountsResponse400, GetGpBankAccountsResponse401, GetGpBankAccountsResponse403, GetGpBankAccountsResponse404, GetGpBankAccountsResponse500, GetGpBankGuideMetadataParam, GetGpBankGuideResponse200, GetGpBankGuideResponse400, GetGpBankGuideResponse401, GetGpBankGuideResponse403, GetGpBankGuideResponse404, GetGpBankGuideResponse500, GetGpLegalEntitiesMetadataParam, GetGpLegalEntitiesResponse200, GetGpLegalEntitiesResponse400, GetGpLegalEntitiesResponse401, GetGpLegalEntitiesResponse403, GetGpLegalEntitiesResponse404, GetGpLegalEntitiesResponse500, GetGrossToNetGpReportsMetadataParam, GetGrossToNetGpReportsResponse200, GetGrossToNetGpReportsResponse400, GetGrossToNetGpReportsResponse401, GetGrossToNetGpReportsResponse403, GetGrossToNetGpReportsResponse404, GetGrossToNetGpReportsResponse500, GetGroupsMetadataParam, GetGroupsResponse200, GetGroupsResponse400, GetGroupsResponse401, GetGroupsResponse403, GetGroupsResponse404, GetGroupsResponse500, GetHourlyReportPresetByIdMetadataParam, GetHourlyReportPresetByIdResponse200, GetHourlyReportPresetByIdResponse400, GetHourlyReportPresetByIdResponse401, GetHourlyReportPresetByIdResponse403, GetHourlyReportPresetByIdResponse404, GetHourlyReportPresetByIdResponse500, GetHourlyReportPresetsMetadataParam, GetHourlyReportPresetsResponse200, GetHourlyReportPresetsResponse400, GetHourlyReportPresetsResponse401, GetHourlyReportPresetsResponse403, GetHourlyReportPresetsResponse404, GetHourlyReportPresetsResponse500, GetHourlyReportRootPresetByIdMetadataParam, GetHourlyReportRootPresetByIdResponse200, GetHourlyReportRootPresetByIdResponse400, GetHourlyReportRootPresetByIdResponse401, GetHourlyReportRootPresetByIdResponse403, GetHourlyReportRootPresetByIdResponse404, GetHourlyReportRootPresetByIdResponse500, GetHourlyReportRootPresetsMetadataParam, GetHourlyReportRootPresetsResponse200, GetHourlyReportRootPresetsResponse400, GetHourlyReportRootPresetsResponse401, GetHourlyReportRootPresetsResponse403, GetHourlyReportRootPresetsResponse404, GetHourlyReportRootPresetsResponse500, GetHrisPositionsMetadataParam, GetHrisPositionsResponse200, GetHrisPositionsResponse400, GetHrisPositionsResponse401, GetHrisPositionsResponse403, GetHrisPositionsResponse404, GetHrisPositionsResponse500, GetInviteLinkMetadataParam, GetInviteLinkResponse200, GetInviteLinkResponse400, GetInviteLinkResponse401, GetInviteLinkResponse403, GetInviteLinkResponse404, GetInviteLinkResponse500, GetInvoiceAdjustmentsByContractIdMetadataParam, GetInvoiceAdjustmentsByContractIdResponse200, GetInvoiceAdjustmentsByContractIdResponse400, GetInvoiceAdjustmentsByContractIdResponse401, GetInvoiceAdjustmentsByContractIdResponse403, GetInvoiceAdjustmentsByContractIdResponse404, GetInvoiceAdjustmentsByContractIdResponse500, GetInvoiceAdjustmentsByIdMetadataParam, GetInvoiceAdjustmentsByIdResponse200, GetInvoiceAdjustmentsByIdResponse400, GetInvoiceAdjustmentsByIdResponse401, GetInvoiceAdjustmentsByIdResponse403, GetInvoiceAdjustmentsByIdResponse404, GetInvoiceAdjustmentsByIdResponse500, GetInvoiceAdjustmentsMetadataParam, GetInvoiceAdjustmentsResponse200, GetInvoiceAdjustmentsResponse400, GetInvoiceAdjustmentsResponse401, GetInvoiceAdjustmentsResponse403, GetInvoiceAdjustmentsResponse404, GetInvoiceAdjustmentsResponse500, GetInvoiceListMetadataParam, GetInvoiceListResponse200, GetInvoiceListResponse400, GetInvoiceListResponse401, GetInvoiceListResponse403, GetInvoiceListResponse404, GetInvoiceListResponse500, GetJobTitleListMetadataParam, GetJobTitleListResponse200, GetJobTitleListResponse400, GetJobTitleListResponse401, GetJobTitleListResponse403, GetJobTitleListResponse404, GetJobTitleListResponse500, GetLegalEntityListMetadataParam, GetLegalEntityListResponse200, GetLegalEntityListResponse400, GetLegalEntityListResponse401, GetLegalEntityListResponse403, GetLegalEntityListResponse404, GetLegalEntityListResponse500, GetLegalEntityMetadataParam, GetLegalEntityPayrollSettingsMetadataParam, GetLegalEntityPayrollSettingsResponse200, GetLegalEntityPayrollSettingsResponse400, GetLegalEntityPayrollSettingsResponse401, GetLegalEntityPayrollSettingsResponse403, GetLegalEntityPayrollSettingsResponse404, GetLegalEntityPayrollSettingsResponse500, GetLegalEntityResponse200, GetLegalEntityResponse400, GetLegalEntityResponse401, GetLegalEntityResponse403, GetLegalEntityResponse404, GetLegalEntityResponse500, GetLookupsMetadataParam, GetLookupsResponse200, GetLookupsResponse400, GetLookupsResponse401, GetLookupsResponse403, GetLookupsResponse404, GetLookupsResponse500, GetManagersMetadataParam, GetManagersResponse200, GetManagersResponse400, GetManagersResponse401, GetManagersResponse403, GetManagersResponse404, GetManagersResponse500, GetMilestonesByContractAndIdMetadataParam, GetMilestonesByContractAndIdResponse200, GetMilestonesByContractAndIdResponse400, GetMilestonesByContractAndIdResponse401, GetMilestonesByContractAndIdResponse403, GetMilestonesByContractAndIdResponse404, GetMilestonesByContractAndIdResponse500, GetMilestonesByContractMetadataParam, GetMilestonesByContractResponse200, GetMilestonesByContractResponse400, GetMilestonesByContractResponse401, GetMilestonesByContractResponse403, GetMilestonesByContractResponse404, GetMilestonesByContractResponse500, GetOffCyclePaymentByContractAndIdMetadataParam, GetOffCyclePaymentByContractAndIdResponse200, GetOffCyclePaymentByContractAndIdResponse400, GetOffCyclePaymentByContractAndIdResponse401, GetOffCyclePaymentByContractAndIdResponse403, GetOffCyclePaymentByContractAndIdResponse404, GetOffCyclePaymentByContractAndIdResponse500, GetOffCyclePaymentsByContractMetadataParam, GetOffCyclePaymentsByContractResponse200, GetOffCyclePaymentsByContractResponse400, GetOffCyclePaymentsByContractResponse401, GetOffCyclePaymentsByContractResponse403, GetOffCyclePaymentsByContractResponse404, GetOffCyclePaymentsByContractResponse500, GetOnboardingDetailsByTrackerIdMetadataParam, GetOnboardingDetailsByTrackerIdResponse200, GetOnboardingDetailsByTrackerIdResponse400, GetOnboardingDetailsByTrackerIdResponse401, GetOnboardingDetailsByTrackerIdResponse403, GetOnboardingDetailsByTrackerIdResponse404, GetOnboardingDetailsByTrackerIdResponse500, GetOnboardingOverviewMetadataParam, GetOnboardingOverviewResponse200, GetOnboardingOverviewResponse400, GetOnboardingOverviewResponse401, GetOnboardingOverviewResponse403, GetOnboardingOverviewResponse404, GetOnboardingOverviewResponse500, GetOrgStructureByExternalIdMetadataParam, GetOrgStructureByExternalIdResponse200, GetOrgStructureByExternalIdResponse400, GetOrgStructureByExternalIdResponse401, GetOrgStructureByExternalIdResponse403, GetOrgStructureByExternalIdResponse404, GetOrgStructureByExternalIdResponse500, GetOrgStructureMetadataParam, GetOrgStructureResponse200, GetOrgStructureResponse400, GetOrgStructureResponse401, GetOrgStructureResponse403, GetOrgStructureResponse404, GetOrgStructureResponse500, GetOrganizationRolesResponse200, GetOrganizationRolesResponse400, GetOrganizationRolesResponse401, GetOrganizationRolesResponse403, GetOrganizationRolesResponse404, GetOrganizationRolesResponse500, GetOrganizationsResponse200, GetOrganizationsResponse400, GetOrganizationsResponse401, GetOrganizationsResponse403, GetOrganizationsResponse404, GetOrganizationsResponse500, GetPayStubMetadataParam, GetPayStubResponse200, GetPayStubResponse400, GetPayStubResponse401, GetPayStubResponse403, GetPayStubResponse404, GetPayStubResponse500, GetPaymentListMetadataParam, GetPaymentListResponse200, GetPaymentListResponse400, GetPaymentListResponse401, GetPaymentListResponse403, GetPaymentListResponse404, GetPaymentListResponse500, GetPaymentsBreakDownByIdMetadataParam, GetPaymentsBreakDownByIdResponse200, GetPaymentsBreakDownByIdResponse400, GetPaymentsBreakDownByIdResponse401, GetPaymentsBreakDownByIdResponse403, GetPaymentsBreakDownByIdResponse404, GetPaymentsBreakDownByIdResponse500, GetPayoutMethodsMetadataParam, GetPayoutMethodsResponse200, GetPayoutMethodsResponse400, GetPayoutMethodsResponse401, GetPayoutMethodsResponse403, GetPayoutMethodsResponse404, GetPayoutMethodsResponse500, GetPeopleByIdMetadataParam, GetPeopleByIdResponse200, GetPeopleByIdResponse400, GetPeopleByIdResponse401, GetPeopleByIdResponse403, GetPeopleByIdResponse404, GetPeopleByIdResponse500, GetPeopleListMetadataParam, GetPeopleListResponse200, GetPeopleListResponse400, GetPeopleListResponse401, GetPeopleListResponse403, GetPeopleListResponse404, GetPeopleListResponse500, GetPeoplePersonalInformationByExternalIdMetadataParam, GetPeoplePersonalInformationByExternalIdResponse200, GetPeoplePersonalInformationByExternalIdResponse400, GetPeoplePersonalInformationByExternalIdResponse401, GetPeoplePersonalInformationByExternalIdResponse403, GetPeoplePersonalInformationByExternalIdResponse404, GetPeoplePersonalInformationByExternalIdResponse500, GetPeoplePersonalInformationByIdMetadataParam, GetPeoplePersonalInformationByIdResponse200, GetPeoplePersonalInformationByIdResponse400, GetPeoplePersonalInformationByIdResponse401, GetPeoplePersonalInformationByIdResponse403, GetPeoplePersonalInformationByIdResponse404, GetPeoplePersonalInformationByIdResponse500, GetPeopleResponse200, GetPeopleResponse400, GetPeopleResponse401, GetPeopleResponse403, GetPeopleResponse404, GetPeopleResponse500, GetPoliciesForProfileMetadataParam, GetPoliciesForProfileResponse200, GetPoliciesForProfileResponse400, GetPoliciesForProfileResponse401, GetPoliciesForProfileResponse403, GetPoliciesForProfileResponse404, GetPoliciesForProfileResponse500, GetProfileEntitlementsMetadataParam, GetProfileEntitlementsResponse200, GetProfileEntitlementsResponse400, GetProfileEntitlementsResponse401, GetProfileEntitlementsResponse403, GetProfileEntitlementsResponse404, GetProfileEntitlementsResponse500, GetRetrieveOffboardingListMetadataParam, GetRetrieveOffboardingListResponse200, GetRetrieveOffboardingListResponse400, GetRetrieveOffboardingListResponse401, GetRetrieveOffboardingListResponse403, GetRetrieveOffboardingListResponse404, GetRetrieveOffboardingListResponse500, GetRetrieveTerminationDetailsByIdMetadataParam, GetRetrieveTerminationDetailsByIdResponse200, GetRetrieveTerminationDetailsByIdResponse400, GetRetrieveTerminationDetailsByIdResponse401, GetRetrieveTerminationDetailsByIdResponse403, GetRetrieveTerminationDetailsByIdResponse404, GetRetrieveTerminationDetailsByIdResponse500, GetRetrieveTerminationDetailsMetadataParam, GetRetrieveTerminationDetailsResponse200, GetRetrieveTerminationDetailsResponse400, GetRetrieveTerminationDetailsResponse401, GetRetrieveTerminationDetailsResponse403, GetRetrieveTerminationDetailsResponse404, GetRetrieveTerminationDetailsResponse500, GetSeniorityListResponse200, GetSeniorityListResponse400, GetSeniorityListResponse401, GetSeniorityListResponse403, GetSeniorityListResponse404, GetSeniorityListResponse500, GetShiftDetailsMetadataParam, GetShiftDetailsResponse200, GetShiftDetailsResponse400, GetShiftDetailsResponse401, GetShiftDetailsResponse403, GetShiftDetailsResponse404, GetShiftDetailsResponse500, GetShiftRateMetadataParam, GetShiftRateResponse200, GetShiftRateResponse400, GetShiftRateResponse401, GetShiftRateResponse403, GetShiftRateResponse404, GetShiftRateResponse500, GetShiftRatesMetadataParam, GetShiftRatesResponse200, GetShiftRatesResponse400, GetShiftRatesResponse401, GetShiftRatesResponse403, GetShiftRatesResponse404, GetShiftRatesResponse500, GetShiftsMetadataParam, GetShiftsResponse200, GetShiftsResponse400, GetShiftsResponse401, GetShiftsResponse403, GetShiftsResponse404, GetShiftsResponse500, GetTasksByContractMetadataParam, GetTasksByContractResponse200, GetTasksByContractResponse400, GetTasksByContractResponse401, GetTasksByContractResponse403, GetTasksByContractResponse404, GetTasksByContractResponse500, GetTeamsResponse200, GetTeamsResponse400, GetTeamsResponse401, GetTeamsResponse403, GetTeamsResponse404, GetTeamsResponse500, GetTheValidationsMetadataParam, GetTheValidationsResponse200, GetTheValidationsResponse401, GetTheValidationsResponse403, GetTimeOffsQueryForOrganizationMetadataParam, GetTimeOffsQueryForOrganizationResponse200, GetTimeOffsQueryForOrganizationResponse400, GetTimeOffsQueryForOrganizationResponse401, GetTimeOffsQueryForOrganizationResponse403, GetTimeOffsQueryForOrganizationResponse404, GetTimeOffsQueryForOrganizationResponse500, GetTimeOffsQueryMetadataParam, GetTimeOffsQueryResponse200, GetTimeOffsQueryResponse400, GetTimeOffsQueryResponse401, GetTimeOffsQueryResponse403, GetTimeOffsQueryResponse404, GetTimeOffsQueryResponse500, GetTimeoffTypeListResponse200, GetTimeoffTypeListResponse400, GetTimeoffTypeListResponse401, GetTimeoffTypeListResponse403, GetTimeoffTypeListResponse404, GetTimeoffTypeListResponse500, GetTimesheetByIdMetadataParam, GetTimesheetByIdResponse200, GetTimesheetByIdResponse400, GetTimesheetByIdResponse401, GetTimesheetByIdResponse403, GetTimesheetByIdResponse404, GetTimesheetByIdResponse500, GetTimesheetsByContractMetadataParam, GetTimesheetsByContractResponse200, GetTimesheetsByContractResponse400, GetTimesheetsByContractResponse401, GetTimesheetsByContractResponse403, GetTimesheetsByContractResponse404, GetTimesheetsByContractResponse500, GetTimesheetsMetadataParam, GetTimesheetsResponse200, GetTimesheetsResponse400, GetTimesheetsResponse401, GetTimesheetsResponse403, GetTimesheetsResponse404, GetTimesheetsResponse500, GetVerificationMethodMetadataParam, GetVerificationMethodResponse200, GetVerificationMethodResponse400, GetVerificationMethodResponse401, GetVerificationMethodResponse403, GetVerificationMethodResponse404, GetVerificationMethodResponse500, GetWorkScheduleAndHolidaysMetadataParam, GetWorkScheduleAndHolidaysResponse200, GetWorkScheduleAndHolidaysResponse400, GetWorkScheduleAndHolidaysResponse401, GetWorkScheduleAndHolidaysResponse403, GetWorkScheduleAndHolidaysResponse404, GetWorkScheduleAndHolidaysResponse500, GetWorkerAdditionalFieldsForEorMetadataParam, GetWorkerAdditionalFieldsForEorResponse200, GetWorkerAdditionalFieldsForEorResponse400, GetWorkerAdditionalFieldsForEorResponse401, GetWorkerAdditionalFieldsForEorResponse403, GetWorkerAdditionalFieldsForEorResponse404, GetWorkerAdditionalFieldsForEorResponse500, GetWorkerPayslipsMetadataParam, GetWorkerPayslipsResponse200, GetWorkerPayslipsResponse400, GetWorkerPayslipsResponse401, GetWorkerPayslipsResponse403, GetWorkerPayslipsResponse404, GetWorkerPayslipsResponse500, GetYearToDatePayMetadataParam, GetYearToDatePayResponse200, GetYearToDatePayResponse400, GetYearToDatePayResponse401, GetYearToDatePayResponse403, GetYearToDatePayResponse404, GetYearToDatePayResponse500, ImmigrationCaseDetailsMetadataParam, ImmigrationCaseDetailsResponse200, ImmigrationCaseDetailsResponse400, ImmigrationCaseDetailsResponse401, ImmigrationCaseDetailsResponse403, ImmigrationCaseDetailsResponse404, ImmigrationCaseDetailsResponse500, ImmigrationDocumentMetadataParam, ImmigrationDocumentResponse200, ImmigrationDocumentResponse400, ImmigrationDocumentResponse401, ImmigrationDocumentResponse403, ImmigrationDocumentResponse404, ImmigrationDocumentResponse500, ImmigrationVisaTypesMetadataParam, ImmigrationVisaTypesResponse200, ImmigrationVisaTypesResponse400, ImmigrationVisaTypesResponse401, ImmigrationVisaTypesResponse403, ImmigrationVisaTypesResponse404, ImmigrationVisaTypesResponse500, InviteToSignContractBodyParam, InviteToSignContractMetadataParam, InviteToSignContractResponse201, InviteToSignContractResponse400, InviteToSignContractResponse401, InviteToSignContractResponse403, InviteToSignContractResponse404, InviteToSignContractResponse500, ListOfJobScopeTemplatesForEorContractsMetadataParam, ListOfJobScopeTemplatesForEorContractsResponse200, ListOfJobScopeTemplatesForEorContractsResponse400, ListOfJobScopeTemplatesForEorContractsResponse401, ListOfJobScopeTemplatesForEorContractsResponse403, ListOfJobScopeTemplatesForEorContractsResponse404, ListOfJobScopeTemplatesForEorContractsResponse500, ListOnboardingTrackerMetadataParam, ListOnboardingTrackerResponse200, ListOnboardingTrackerResponse400, ListOnboardingTrackerResponse401, ListOnboardingTrackerResponse403, ListOnboardingTrackerResponse404, ListOnboardingTrackerResponse500, PatchEorBankAccountBodyParam, PatchEorBankAccountMetadataParam, PatchEorBankAccountResponse201, PatchEorBankAccountResponse400, PatchEorBankAccountResponse401, PatchEorBankAccountResponse403, PatchEorBankAccountResponse404, PatchEorBankAccountResponse500, PatchGpBankAccountBodyParam, PatchGpBankAccountMetadataParam, PatchGpBankAccountResponse200, PatchGpBankAccountResponse400, PatchGpBankAccountResponse401, PatchGpBankAccountResponse403, PatchGpBankAccountResponse404, PatchGpBankAccountResponse500, Post401KEnrollmentsDefinitionBodyParam, Post401KEnrollmentsDefinitionMetadataParam, Post401KEnrollmentsDefinitionResponse200, Post401KEnrollmentsDefinitionResponse400, Post401KEnrollmentsDefinitionResponse401, Post401KEnrollmentsDefinitionResponse403, Post401KEnrollmentsDefinitionResponse404, Post401KEnrollmentsDefinitionResponse500, Post401KPlansDefinitionBodyParam, Post401KPlansDefinitionMetadataParam, Post401KPlansDefinitionResponse200, Post401KPlansDefinitionResponse400, Post401KPlansDefinitionResponse401, Post401KPlansDefinitionResponse403, Post401KPlansDefinitionResponse404, Post401KPlansDefinitionResponse500, Post401KSingleDeductionDefinitionBodyParam, Post401KSingleDeductionDefinitionMetadataParam, Post401KSingleDeductionDefinitionResponse200, Post401KSingleDeductionDefinitionResponse400, Post401KSingleDeductionDefinitionResponse401, Post401KSingleDeductionDefinitionResponse403, Post401KSingleDeductionDefinitionResponse404, Post401KSingleDeductionDefinitionResponse500, ProfilesBodyParam, ProfilesResponse200, ProfilesResponse400, ProfilesResponse401, ProfilesResponse403, ProfilesResponse404, ProfilesResponse500, Put401KEnrollmentsDefinitionBodyParam, Put401KEnrollmentsDefinitionMetadataParam, Put401KEnrollmentsDefinitionResponse200, Put401KEnrollmentsDefinitionResponse400, Put401KEnrollmentsDefinitionResponse401, Put401KEnrollmentsDefinitionResponse403, Put401KEnrollmentsDefinitionResponse404, Put401KEnrollmentsDefinitionResponse500, Put401KPlansDefinitionBodyParam, Put401KPlansDefinitionMetadataParam, Put401KPlansDefinitionResponse200, Put401KPlansDefinitionResponse400, Put401KPlansDefinitionResponse401, Put401KPlansDefinitionResponse403, Put401KPlansDefinitionResponse404, Put401KPlansDefinitionResponse500, RequestExerciseEquityBodyParam, RequestExerciseEquityResponse201, RequestExerciseEquityResponse400, RequestExerciseEquityResponse401, RequestExerciseEquityResponse403, RequestExerciseEquityResponse404, RequestExerciseEquityResponse500, RequestTerminationBodyParam, RequestTerminationMetadataParam, RequestTerminationResponse201, RequestTerminationResponse400, RequestTerminationResponse401, RequestTerminationResponse403, RequestTerminationResponse404, RequestTerminationResponse500, RequestjobScopeValidationBodyParam, RequestjobScopeValidationResponse201, RequestjobScopeValidationResponse400, RequestjobScopeValidationResponse401, RequestjobScopeValidationResponse403, RequestjobScopeValidationResponse404, RequestjobScopeValidationResponse500, ResignationRequestMadeByEmployeeBodyParam, ResignationRequestMadeByEmployeeMetadataParam, ResignationRequestMadeByEmployeeResponse200, ResignationRequestMadeByEmployeeResponse400, ResignationRequestMadeByEmployeeResponse401, ResignationRequestMadeByEmployeeResponse403, ResignationRequestMadeByEmployeeResponse404, ResignationRequestMadeByEmployeeResponse500, RetrieveBenefitsByCountryMetadataParam, RetrieveBenefitsByCountryResponse200, RetrieveBenefitsByCountryResponse400, RetrieveBenefitsByCountryResponse401, RetrieveBenefitsByCountryResponse403, RetrieveBenefitsByCountryResponse404, RetrieveBenefitsByCountryResponse500, RetrieveDeelInvoicesMetadataParam, RetrieveDeelInvoicesResponse200, RetrieveDeelInvoicesResponse400, RetrieveDeelInvoicesResponse401, RetrieveDeelInvoicesResponse403, RetrieveDeelInvoicesResponse404, RetrieveDeelInvoicesResponse500, RetrieveEorContractDetailsMetadataParam, RetrieveEorContractDetailsResponse200, RetrieveEorContractDetailsResponse400, RetrieveEorContractDetailsResponse401, RetrieveEorContractDetailsResponse403, RetrieveEorContractDetailsResponse404, RetrieveEorContractDetailsResponse500, RetrievePolicyValidationTemplatesMetadataParam, RetrievePolicyValidationTemplatesResponse200, RetrievePolicyValidationTemplatesResponse400, RetrievePolicyValidationTemplatesResponse401, RetrievePolicyValidationTemplatesResponse403, RetrievePolicyValidationTemplatesResponse404, RetrievePolicyValidationTemplatesResponse500, RetrieveWorkingLocationsResponse200, RetrieveWorkingLocationsResponse400, RetrieveWorkingLocationsResponse401, RetrieveWorkingLocationsResponse403, RetrieveWorkingLocationsResponse404, RetrieveWorkingLocationsResponse500, SignContractBodyParam, SignContractMetadataParam, SignContractResponse201, SignContractResponse400, SignContractResponse401, SignContractResponse403, SignContractResponse404, SignContractResponse500, TerminateContractBodyParam, TerminateContractMetadataParam, TerminateContractResponse201, TerminateContractResponse400, TerminateContractResponse401, TerminateContractResponse403, TerminateContractResponse404, TerminateContractResponse500, UninviteToSignContractMetadataParam, UninviteToSignContractResponse200, UninviteToSignContractResponse400, UninviteToSignContractResponse401, UninviteToSignContractResponse403, UninviteToSignContractResponse404, UninviteToSignContractResponse500, UpdateAdjustmentBodyParam, UpdateAdjustmentMetadataParam, UpdateAdjustmentResponse200, UpdateAdjustmentResponse400, UpdateAdjustmentResponse401, UpdateAdjustmentResponse403, UpdateAdjustmentResponse404, UpdateAdjustmentResponse500, UpdateAutoWithdrawSettingBodyParam, UpdateAutoWithdrawSettingResponse400, UpdateAutoWithdrawSettingResponse401, UpdateAutoWithdrawSettingResponse403, UpdateAutoWithdrawSettingResponse404, UpdateAutoWithdrawSettingResponse500, UpdateBankTransferMethodBodyParam, UpdateBankTransferMethodMetadataParam, UpdateBankTransferMethodResponse200, UpdateBankTransferMethodResponse400, UpdateBankTransferMethodResponse401, UpdateBankTransferMethodResponse403, UpdateBankTransferMethodResponse404, UpdateBankTransferMethodResponse500, UpdateEorContractBodyParam, UpdateEorContractMetadataParam, UpdateEorContractResponse200, UpdateEorContractResponse400, UpdateEorContractResponse401, UpdateEorContractResponse403, UpdateEorContractResponse404, UpdateEorContractResponse500, UpdateGpEmployeeAddressBodyParam, UpdateGpEmployeeAddressMetadataParam, UpdateGpEmployeeAddressResponse201, UpdateGpEmployeeAddressResponse400, UpdateGpEmployeeAddressResponse401, UpdateGpEmployeeAddressResponse403, UpdateGpEmployeeAddressResponse404, UpdateGpEmployeeAddressResponse500, UpdateGpEmployeeCompensationBodyParam, UpdateGpEmployeeCompensationMetadataParam, UpdateGpEmployeeCompensationResponse200, UpdateGpEmployeeCompensationResponse400, UpdateGpEmployeeCompensationResponse401, UpdateGpEmployeeCompensationResponse403, UpdateGpEmployeeCompensationResponse404, UpdateGpEmployeeCompensationResponse500, UpdateGpEmployeeInformationBodyParam, UpdateGpEmployeeInformationMetadataParam, UpdateGpEmployeeInformationResponse201, UpdateGpEmployeeInformationResponse400, UpdateGpEmployeeInformationResponse401, UpdateGpEmployeeInformationResponse403, UpdateGpEmployeeInformationResponse404, UpdateGpEmployeeInformationResponse500, UpdateGpEmployeePtoBodyParam, UpdateGpEmployeePtoMetadataParam, UpdateGpEmployeePtoResponse200, UpdateGpEmployeePtoResponse400, UpdateGpEmployeePtoResponse401, UpdateGpEmployeePtoResponse403, UpdateGpEmployeePtoResponse404, UpdateGpEmployeePtoResponse500, UpdateHourlyReportPresetBodyParam, UpdateHourlyReportPresetMetadataParam, UpdateHourlyReportPresetResponse200, UpdateHourlyReportPresetResponse400, UpdateHourlyReportPresetResponse401, UpdateHourlyReportPresetResponse403, UpdateHourlyReportPresetResponse404, UpdateHourlyReportPresetResponse500, UpdateInvoiceAdjustmentBodyParam, UpdateInvoiceAdjustmentByIdBodyParam, UpdateInvoiceAdjustmentByIdMetadataParam, UpdateInvoiceAdjustmentByIdResponse201, UpdateInvoiceAdjustmentByIdResponse400, UpdateInvoiceAdjustmentByIdResponse401, UpdateInvoiceAdjustmentByIdResponse403, UpdateInvoiceAdjustmentByIdResponse404, UpdateInvoiceAdjustmentByIdResponse500, UpdateInvoiceAdjustmentMetadataParam, UpdateInvoiceAdjustmentResponse200, UpdateInvoiceAdjustmentResponse400, UpdateInvoiceAdjustmentResponse401, UpdateInvoiceAdjustmentResponse403, UpdateInvoiceAdjustmentResponse404, UpdateInvoiceAdjustmentResponse500, UpdateOrgStructureBodyParam, UpdateOrgStructureByExternalIdBodyParam, UpdateOrgStructureByExternalIdMetadataParam, UpdateOrgStructureByExternalIdResponse200, UpdateOrgStructureByExternalIdResponse400, UpdateOrgStructureByExternalIdResponse401, UpdateOrgStructureByExternalIdResponse403, UpdateOrgStructureByExternalIdResponse404, UpdateOrgStructureByExternalIdResponse500, UpdateOrgStructureMetadataParam, UpdateOrgStructureResponse200, UpdateOrgStructureResponse400, UpdateOrgStructureResponse401, UpdateOrgStructureResponse403, UpdateOrgStructureResponse404, UpdateOrgStructureResponse500, UpdateOrganizationRoleBodyParam, UpdateOrganizationRoleMetadataParam, UpdateOrganizationRoleResponse200, UpdateOrganizationRoleResponse400, UpdateOrganizationRoleResponse401, UpdateOrganizationRoleResponse403, UpdateOrganizationRoleResponse404, UpdateOrganizationRoleResponse500, UpdatePeopleDepartmentBodyParam, UpdatePeopleDepartmentMetadataParam, UpdatePeopleDepartmentResponse200, UpdatePeopleDepartmentResponse400, UpdatePeopleDepartmentResponse401, UpdatePeopleDepartmentResponse403, UpdatePeopleDepartmentResponse404, UpdatePeopleDepartmentResponse500, UpdatePeoplePersonalInformationByExternalIdBodyParam, UpdatePeoplePersonalInformationByExternalIdMetadataParam, UpdatePeoplePersonalInformationByExternalIdResponse400, UpdatePeoplePersonalInformationByExternalIdResponse401, UpdatePeoplePersonalInformationByExternalIdResponse403, UpdatePeoplePersonalInformationByExternalIdResponse404, UpdatePeoplePersonalInformationByExternalIdResponse500, UpdatePeoplePersonalInformationByIdBodyParam, UpdatePeoplePersonalInformationByIdMetadataParam, UpdatePeoplePersonalInformationByIdResponse400, UpdatePeoplePersonalInformationByIdResponse401, UpdatePeoplePersonalInformationByIdResponse403, UpdatePeoplePersonalInformationByIdResponse404, UpdatePeoplePersonalInformationByIdResponse500, UpdatePeopleWorkingLocationBodyParam, UpdatePeopleWorkingLocationMetadataParam, UpdatePeopleWorkingLocationResponse200, UpdatePeopleWorkingLocationResponse400, UpdatePeopleWorkingLocationResponse401, UpdatePeopleWorkingLocationResponse403, UpdatePeopleWorkingLocationResponse404, UpdatePeopleWorkingLocationResponse500, UpdateShiftBodyParam, UpdateShiftMetadataParam, UpdateShiftRateBodyParam, UpdateShiftRateMetadataParam, UpdateShiftRateResponse200, UpdateShiftRateResponse400, UpdateShiftRateResponse401, UpdateShiftRateResponse403, UpdateShiftRateResponse404, UpdateShiftRateResponse500, UpdateShiftResponse200, UpdateShiftResponse400, UpdateShiftResponse401, UpdateShiftResponse403, UpdateShiftResponse404, UpdateShiftResponse500, UpdateTimeOffBodyParam, UpdateTimeOffMetadataParam, UpdateTimeOffResponse200, UpdateTimeOffResponse400, UpdateTimeOffResponse401, UpdateTimeOffResponse403, UpdateTimeOffResponse404, UpdateTimeOffResponse500, UpdateTimesheetByIdBodyParam, UpdateTimesheetByIdMetadataParam, UpdateTimesheetByIdResponse201, UpdateTimesheetByIdResponse400, UpdateTimesheetByIdResponse401, UpdateTimesheetByIdResponse403, UpdateTimesheetByIdResponse404, UpdateTimesheetByIdResponse500, UpdateWorkerRelationTypeBodyParam, UpdateWorkerRelationTypeExternalIdBodyParam, UpdateWorkerRelationTypeExternalIdMetadataParam, UpdateWorkerRelationTypeExternalIdResponse204, UpdateWorkerRelationTypeExternalIdResponse400, UpdateWorkerRelationTypeExternalIdResponse401, UpdateWorkerRelationTypeExternalIdResponse403, UpdateWorkerRelationTypeExternalIdResponse404, UpdateWorkerRelationTypeExternalIdResponse500, UpdateWorkerRelationTypeMetadataParam, UpdateWorkerRelationTypeResponse204, UpdateWorkerRelationTypeResponse400, UpdateWorkerRelationTypeResponse401, UpdateWorkerRelationTypeResponse403, UpdateWorkerRelationTypeResponse404, UpdateWorkerRelationTypeResponse500, UploadEmployeeComplianceDocumentBodyParam, UploadEmployeeComplianceDocumentMetadataParam, UploadEmployeeComplianceDocumentResponse200, UploadEmployeeComplianceDocumentResponse400, UploadEmployeeComplianceDocumentResponse401, UploadEmployeeComplianceDocumentResponse403, UploadEmployeeComplianceDocumentResponse404, UploadEmployeeComplianceDocumentResponse500, UpsertAmendmentBodyParam, UpsertAmendmentMetadataParam, UpsertAmendmentResponse200, UpsertAmendmentResponse400, UpsertAmendmentResponse401, UpsertAmendmentResponse403, UpsertChildWorkerRelationsBodyParam, UpsertChildWorkerRelationsExternalIdBodyParam, UpsertChildWorkerRelationsExternalIdMetadataParam, UpsertChildWorkerRelationsExternalIdResponse204, UpsertChildWorkerRelationsExternalIdResponse400, UpsertChildWorkerRelationsExternalIdResponse401, UpsertChildWorkerRelationsExternalIdResponse403, UpsertChildWorkerRelationsExternalIdResponse404, UpsertChildWorkerRelationsExternalIdResponse500, UpsertChildWorkerRelationsMetadataParam, UpsertChildWorkerRelationsResponse204, UpsertChildWorkerRelationsResponse400, UpsertChildWorkerRelationsResponse401, UpsertChildWorkerRelationsResponse403, UpsertChildWorkerRelationsResponse404, UpsertChildWorkerRelationsResponse500, UpsertCustomFieldValueFromContractsBodyParam, UpsertCustomFieldValueFromContractsMetadataParam, UpsertCustomFieldValueFromContractsResponse400, UpsertCustomFieldValueFromContractsResponse401, UpsertCustomFieldValueFromContractsResponse403, UpsertCustomFieldValueFromContractsResponse500, UpsertCustomFieldValueFromWorkerBodyParam, UpsertCustomFieldValueFromWorkerMetadataParam, UpsertCustomFieldValueFromWorkerResponse400, UpsertCustomFieldValueFromWorkerResponse401, UpsertCustomFieldValueFromWorkerResponse403, UpsertCustomFieldValueFromWorkerResponse500, UpsertParentWorkerRelationsBodyParam, UpsertParentWorkerRelationsMetadataParam, UpsertParentWorkerRelationsResponse204, UpsertParentWorkerRelationsResponse400, UpsertParentWorkerRelationsResponse401, UpsertParentWorkerRelationsResponse403, UpsertParentWorkerRelationsResponse404, UpsertParentWorkerRelationsResponse500, ValidateDataPointsBodyParam, ValidateDataPointsMetadataParam, ValidateDataPointsResponse200, ValidateDataPointsResponse401, ValidateDataPointsResponse403, ValidateTimeOffRequestBodyParam, ValidateTimeOffRequestResponse200, ValidateTimeOffRequestResponse400, ValidateTimeOffRequestResponse401, ValidateTimeOffRequestResponse403, ValidateTimeOffRequestResponse404, ValidateTimeOffRequestResponse500, ViewInformationAboutAmendmentMetadataParam, ViewInformationAboutAmendmentResponse200, ViewInformationAboutAmendmentResponse401, ViewInformationAboutAmendmentResponse403, WebhookControllerDeleteByIdMetadataParam, WebhookControllerDeleteByIdResponse200, WebhookControllerDeleteByIdResponse400, WebhookControllerDeleteByIdResponse401, WebhookControllerDeleteByIdResponse403, WebhookControllerDeleteByIdResponse404, WebhookControllerDeleteByIdResponse405, WebhookControllerDeleteByIdResponse429, WebhookControllerDeleteByIdResponse500, WebhookControllerEditByIdBodyParam, WebhookControllerEditByIdMetadataParam, WebhookControllerEditByIdResponse200, WebhookControllerEditByIdResponse400, WebhookControllerEditByIdResponse401, WebhookControllerEditByIdResponse403, WebhookControllerEditByIdResponse404, WebhookControllerEditByIdResponse405, WebhookControllerEditByIdResponse429, WebhookControllerEditByIdResponse500, WebhookControllerGetByIdMetadataParam, WebhookControllerGetByIdResponse200, WebhookControllerGetByIdResponse400, WebhookControllerGetByIdResponse401, WebhookControllerGetByIdResponse403, WebhookControllerGetByIdResponse404, WebhookControllerGetByIdResponse405, WebhookControllerGetByIdResponse429, WebhookControllerGetByIdResponse500 } from './types';
