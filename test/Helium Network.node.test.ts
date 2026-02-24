/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { HeliumNetwork } from '../nodes/Helium Network/Helium Network.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('HeliumNetwork Node', () => {
  let node: HeliumNetwork;

  beforeAll(() => {
    node = new HeliumNetwork();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Helium Network');
      expect(node.description.name).toBe('heliumnetwork');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 6 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(6);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(6);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('Hotspots Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.helium.io/v1',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  it('should list hotspots successfully', async () => {
    const mockResponse = {
      data: [
        {
          address: '11test123',
          name: 'test-hotspot',
          status: {
            online: 'online',
            height: 123456,
          },
        },
      ],
      cursor: 'next_cursor',
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string, index: number, defaultValue?: any) => {
      switch (param) {
        case 'operation': return 'listHotspots';
        case 'cursor': return '';
        case 'limit': return 100;
        default: return defaultValue;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeHotspotsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.helium.io/v1/hotspots',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      qs: { limit: 100 },
      json: true,
    });
  });

  it('should get specific hotspot successfully', async () => {
    const mockResponse = {
      data: {
        address: '11test123',
        name: 'test-hotspot',
        status: {
          online: 'online',
          height: 123456,
        },
        lat: 40.7128,
        lng: -74.0060,
      },
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string, index: number, defaultValue?: any) => {
      switch (param) {
        case 'operation': return 'getHotspot';
        case 'address': return '11test123';
        default: return defaultValue;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeHotspotsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.helium.io/v1/hotspots/11test123',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  it('should get hotspot activity successfully', async () => {
    const mockResponse = {
      data: [
        {
          type: 'poc_receipts_v1',
          time: 1234567890,
          height: 123456,
        },
      ],
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string, index: number, defaultValue?: any) => {
      switch (param) {
        case 'operation': return 'getHotspotActivity';
        case 'address': return '11test123';
        case 'cursor': return '';
        case 'limit': return 50;
        default: return defaultValue;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeHotspotsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should update hotspot successfully', async () => {
    const mockResponse = {
      data: {
        address: '11test123',
        name: 'new-hotspot-name',
        lat: 40.7128,
        lng: -74.0060,
      },
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string, index: number, defaultValue?: any) => {
      switch (param) {
        case 'operation': return 'updateHotspot';
        case 'address': return '11test123';
        case 'name': return 'new-hotspot-name';
        case 'lat': return 40.7128;
        case 'lng': return -74.0060;
        default: return defaultValue;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeHotspotsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'PATCH',
      url: 'https://api.helium.io/v1/hotspots/11test123',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      body: {
        name: 'new-hotspot-name',
        lat: 40.7128,
        lng: -74.0060,
      },
      json: true,
    });
  });

  it('should handle API errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string, index: number, defaultValue?: any) => {
      switch (param) {
        case 'operation': return 'getHotspot';
        case 'address': return 'invalid-address';
        default: return defaultValue;
      }
    });

    const apiError = new Error('Hotspot not found');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(apiError);
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeHotspotsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('Hotspot not found');
  });
});

describe('Accounts Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.helium.io/v1',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  describe('getAccount operation', () => {
    it('should get account information successfully', async () => {
      const mockResponse = {
        data: {
          address: '13GCcF7oGb6waFBzYDMVzaHBha8rfPPNKTH7bN8qbLAb5TdCMcT',
          balance: 100000000,
          nonce: 1,
        },
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'getAccount';
        if (param === 'address') return '13GCcF7oGb6waFBzYDMVzaHBha8rfPPNKTH7bN8qbLAb5TdCMcT';
        return undefined;
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeAccountsOperations.call(mockExecuteFunctions, items);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.helium.io/v1/accounts/13GCcF7oGb6waFBzYDMVzaHBha8rfPPNKTH7bN8qbLAb5TdCMcT',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Accept': 'application/json',
        },
        json: true,
      });
    });

    it('should handle API errors', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'getAccount';
        if (param === 'address') return 'invalid-address';
        return undefined;
      });

      const error = new Error('Account not found');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(error);

      const items = [{ json: {} }];
      
      await expect(executeAccountsOperations.call(mockExecuteFunctions, items)).rejects.toThrow('Account not found');
    });
  });

  describe('getAccountHotspots operation', () => {
    it('should get account hotspots with pagination', async () => {
      const mockResponse = {
        data: [
          {
            address: 'hotspot-address-1',
            name: 'test-hotspot-1',
          },
        ],
        cursor: 'next-cursor',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'getAccountHotspots';
        if (param === 'address') return '13GCcF7oGb6waFBzYDMVzaHBha8rfPPNKTH7bN8qbLAb5TdCMcT';
        if (param === 'cursor') return 'test-cursor';
        if (param === 'limit') return 50;
        return undefined;
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeAccountsOperations.call(mockExecuteFunctions, items);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.helium.io/v1/accounts/13GCcF7oGb6waFBzYDMVzaHBha8rfPPNKTH7bN8qbLAb5TdCMcT/hotspots?cursor=test-cursor&limit=50',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Accept': 'application/json',
        },
        json: true,
      });
    });
  });

  describe('submitTransaction operation', () => {
    it('should submit transaction successfully', async () => {
      const mockResponse = {
        data: {
          hash: 'txn-hash',
          status: 'pending',
        },
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'submitTransaction';
        if (param === 'address') return '13GCcF7oGb6waFBzYDMVzaHBha8rfPPNKTH7bN8qbLAb5TdCMcT';
        if (param === 'txn') return 'signed-transaction-data';
        return undefined;
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeAccountsOperations.call(mockExecuteFunctions, items);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.helium.io/v1/accounts/13GCcF7oGb6waFBzYDMVzaHBha8rfPPNKTH7bN8qbLAb5TdCMcT/transactions',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: {
          txn: 'signed-transaction-data',
        },
        json: true,
      });
    });
  });

  describe('error handling', () => {
    it('should handle continue on fail', async () => {
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'getAccount';
        if (param === 'address') return 'invalid-address';
        return undefined;
      });

      const error = new Error('API Error');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(error);

      const items = [{ json: {} }];
      const result = await executeAccountsOperations.call(mockExecuteFunctions, items);

      expect(result).toHaveLength(1);
      expect(result[0].json.error).toBe('API Error');
      expect(result[0].json.operation).toBe('getAccount');
    });

    it('should throw error for unknown operation', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'unknownOperation';
        return undefined;
      });

      const items = [{ json: {} }];
      
      await expect(executeAccountsOperations.call(mockExecuteFunctions, items)).rejects.toThrow('Unknown operation: unknownOperation');
    });
  });
});

describe('Validators Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.helium.io/v1',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  test('listValidators should fetch all validators with pagination', async () => {
    const mockResponse = {
      data: [
        { address: 'validator1', name: 'Test Validator 1', stake: 10000 },
        { address: 'validator2', name: 'Test Validator 2', stake: 15000 },
      ],
      cursor: 'next_cursor_token',
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string, index: number, defaultValue?: any) => {
      switch (param) {
        case 'operation': return 'listValidators';
        case 'cursor': return '';
        case 'limit': return 20;
        default: return defaultValue;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeValidatorsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.helium.io/v1/validators?limit=20',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });

    expect(result).toEqual([
      {
        json: mockResponse,
        pairedItem: { item: 0 },
      },
    ]);
  });

  test('getValidator should fetch specific validator by address', async () => {
    const validatorAddress = '112qB3YaH5bZkCnKA5uRH7tBtGNv2Y5B4smv1jsmvh6MA3Js5P';
    const mockResponse = {
      data: {
        address: validatorAddress,
        name: 'Test Validator',
        stake: 10000,
        status: 'staked',
      },
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string, index: number, defaultValue?: any) => {
      switch (param) {
        case 'operation': return 'getValidator';
        case 'address': return validatorAddress;
        default: return defaultValue;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeValidatorsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: `https://api.helium.io/v1/validators/${validatorAddress}`,
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });

    expect(result).toEqual([
      {
        json: mockResponse,
        pairedItem: { item: 0 },
      },
    ]);
  });

  test('getValidatorActivity should fetch validator activity with pagination', async () => {
    const validatorAddress = '112qB3YaH5bZkCnKA5uRH7tBtGNv2Y5B4smv1jsmvh6MA3Js5P';
    const mockResponse = {
      data: [
        { height: 1000000, consensus_group: true, timestamp: '2023-01-01T00:00:00Z' },
        { height: 999999, consensus_group: false, timestamp: '2023-01-01T01:00:00Z' },
      ],
      cursor: 'activity_cursor',
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string, index: number, defaultValue?: any) => {
      switch (param) {
        case 'operation': return 'getValidatorActivity';
        case 'address': return validatorAddress;
        case 'cursor': return '';
        case 'limit': return 20;
        default: return defaultValue;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeValidatorsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: `https://api.helium.io/v1/validators/${validatorAddress}/activity?limit=20`,
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });

    expect(result).toEqual([
      {
        json: mockResponse,
        pairedItem: { item: 0 },
      },
    ]);
  });

  test('createValidator should create new validator', async () => {
    const validatorAddress = '112qB3YaH5bZkCnKA5uRH7tBtGNv2Y5B4smv1jsmvh6MA3Js5P';
    const stakeAmount = 10000;
    const mockResponse = {
      data: {
        address: validatorAddress,
        stake: stakeAmount,
        status: 'pending',
      },
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string, index: number, defaultValue?: any) => {
      switch (param) {
        case 'operation': return 'createValidator';
        case 'address': return validatorAddress;
        case 'stake': return stakeAmount;
        default: return defaultValue;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeValidatorsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.helium.io/v1/validators',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      body: {
        address: validatorAddress,
        stake: stakeAmount,
      },
      json: true,
    });

    expect(result).toEqual([
      {
        json: mockResponse,
        pairedItem: { item: 0 },
      },
    ]);
  });

  test('should handle errors gracefully when continueOnFail is true', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string, index: number, defaultValue?: any) => {
      switch (param) {
        case 'operation': return 'getValidator';
        case 'address': return 'invalid_address';
        default: return defaultValue;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Validator not found'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeValidatorsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([
      {
        json: { error: 'Validator not found' },
        pairedItem: { item: 0 },
      },
    ]);
  });

  test('unstakeValidator should initiate unstaking process', async () => {
    const validatorAddress = '112qB3YaH5bZkCnKA5uRH7tBtGNv2Y5B4smv1jsmvh6MA3Js5P';
    const mockResponse = {
      data: {
        address: validatorAddress,
        status: 'unstaking',
        cooldown_block: 1000000,
      },
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string, index: number, defaultValue?: any) => {
      switch (param) {
        case 'operation': return 'unstakeValidator';
        case 'address': return validatorAddress;
        default: return defaultValue;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeValidatorsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'DELETE',
      url: `https://api.helium.io/v1/validators/${validatorAddress}/stake`,
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });

    expect(result).toEqual([
      {
        json: mockResponse,
        pairedItem: { item: 0 },
      },
    ]);
  });
});

describe('Rewards Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.helium.io/v1',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  describe('getRewardsSum', () => {
    it('should get rewards sum successfully', async () => {
      const mockResponse = {
        data: [
          {
            timestamp: '2023-01-01T00:00:00Z',
            total: 1000000,
            bucket: 'day',
          },
        ],
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'getRewardsSum';
          case 'minTime': return '2023-01-01T00:00:00Z';
          case 'maxTime': return '2023-01-02T00:00:00Z';
          case 'bucket': return 'day';
          default: return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeRewardsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.helium.io/v1/rewards/sum?min_time=2023-01-01T00%3A00%3A00Z&max_time=2023-01-02T00%3A00%3A00Z&bucket=day',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });
  });

  describe('getBlockRewardsByAccount', () => {
    it('should get block rewards by account successfully', async () => {
      const mockResponse = {
        data: [
          {
            account: 'test-account-address',
            amount: 50000,
            type: 'poc_challengees_reward',
          },
        ],
        cursor: 'next-cursor',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'getBlockRewardsByAccount';
          case 'block': return 123456;
          case 'cursor': return '';
          case 'limit': return 100;
          default: return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeRewardsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('claimRewards', () => {
    it('should claim rewards successfully', async () => {
      const mockResponse = {
        transaction_hash: 'test-txn-hash',
        status: 'pending',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'claimRewards';
          case 'account': return 'test-account-address';
          case 'signature': return 'test-signature';
          default: return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeRewardsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.helium.io/v1/rewards/claim',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        body: {
          account: 'test-account-address',
          signature: 'test-signature',
        },
        json: true,
      });
    });
  });

  describe('getOraclePrice', () => {
    it('should get oracle price successfully', async () => {
      const mockResponse = {
        price: 250000,
        block: 123456,
        timestamp: '2023-01-01T00:00:00Z',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'getOraclePrice';
          default: return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeRewardsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('error handling', () => {
    it('should handle API errors', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'getOraclePrice';
          default: return undefined;
        }
      });

      const apiError = new Error('API Error');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(apiError);

      await expect(
        executeRewardsOperations.call(mockExecuteFunctions, [{ json: {} }])
      ).rejects.toThrow('API Error');
    });

    it('should continue on fail when configured', async () => {
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'getOraclePrice';
          default: return undefined;
        }
      });

      const apiError = new Error('API Error');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(apiError);

      const result = await executeRewardsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json.error).toBe('API Error');
    });
  });
});

describe('Blockchain Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.helium.io/v1',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  test('listBlocks should return blocks data', async () => {
    const mockBlocks = {
      data: [
        { height: 1234567, hash: 'block-hash-1', time: 1640000000 },
        { height: 1234566, hash: 'block-hash-2', time: 1639999900 },
      ],
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'listBlocks';
      if (param === 'cursor') return '';
      if (param === 'limit') return 20;
      return null;
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockBlocks);

    const result = await executeBlockchainOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toEqual([
      { json: mockBlocks, pairedItem: { item: 0 } },
    ]);
  });

  test('getBlock should return specific block data', async () => {
    const mockBlock = {
      data: {
        height: 1234567,
        hash: 'specific-block-hash',
        time: 1640000000,
        transaction_count: 15,
      },
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'getBlock';
      if (param === 'height') return 1234567;
      return null;
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockBlock);

    const result = await executeBlockchainOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toEqual([
      { json: mockBlock, pairedItem: { item: 0 } },
    ]);
  });

  test('getTransaction should return transaction details', async () => {
    const mockTransaction = {
      data: {
        hash: 'transaction-hash-123',
        type: 'payment_v2',
        fee: 35000,
        block: 1234567,
      },
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'getTransaction';
      if (param === 'hash') return 'transaction-hash-123';
      return null;
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockTransaction);

    const result = await executeBlockchainOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toEqual([
      { json: mockTransaction, pairedItem: { item: 0 } },
    ]);
  });

  test('broadcastTransaction should submit transaction', async () => {
    const mockResponse = {
      data: {
        hash: 'new-transaction-hash',
        status: 'pending',
      },
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'broadcastTransaction';
      if (param === 'txn') return 'signed-transaction-data';
      return null;
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeBlockchainOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toEqual([
      { json: mockResponse, pairedItem: { item: 0 } },
    ]);
  });

  test('getNetworkStats should return network statistics', async () => {
    const mockStats = {
      data: {
        block_height: 1234567,
        election_times: { last_day: 3600, last_hour: 3600 },
        token_supply: 223000000,
      },
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'getNetworkStats';
      return null;
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockStats);

    const result = await executeBlockchainOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toEqual([
      { json: mockStats, pairedItem: { item: 0 } },
    ]);
  });

  test('should handle API errors gracefully', async () => {
    const mockError = new Error('API Error');
    (mockError as any).httpCode = 404;

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'getBlock';
      if (param === 'height') return 9999999;
      return null;
    });

    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(mockError);

    await expect(
      executeBlockchainOperations.call(mockExecuteFunctions, [{ json: {} }]),
    ).rejects.toThrow('API Error');
  });

  test('should continue on fail when enabled', async () => {
    const mockError = new Error('Network Error');
    
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'listBlocks';
      return null;
    });
    
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(mockError);

    const result = await executeBlockchainOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toEqual([
      { json: { error: 'Network Error' }, pairedItem: { item: 0 } },
    ]);
  });
});

describe('Elections Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.helium.io/v1',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  describe('listElections', () => {
    it('should list elections successfully', async () => {
      const mockResponse = {
        data: [
          {
            height: 123456,
            timestamp: '2023-01-01T00:00:00Z',
            members: ['hotspot1', 'hotspot2'],
          },
        ],
        cursor: 'next-cursor',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation':
            return 'listElections';
          case 'cursor':
            return '';
          case 'limit':
            return 100;
          default:
            return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeElectionsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.helium.io/v1/elections?limit=100',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });

    it('should handle errors', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation':
            return 'listElections';
          default:
            return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

      await expect(
        executeElectionsOperations.call(mockExecuteFunctions, [{ json: {} }])
      ).rejects.toThrow('API Error');
    });
  });

  describe('getElection', () => {
    it('should get specific election successfully', async () => {
      const mockResponse = {
        height: 123456,
        timestamp: '2023-01-01T00:00:00Z',
        members: ['hotspot1', 'hotspot2'],
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation':
            return 'getElection';
          case 'height':
            return 123456;
          default:
            return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeElectionsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.helium.io/v1/elections/123456',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });
  });

  describe('getCurrentElection', () => {
    it('should get current election successfully', async () => {
      const mockResponse = {
        height: 123456,
        timestamp: '2023-01-01T00:00:00Z',
        members: ['hotspot1', 'hotspot2'],
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation':
            return 'getCurrentElection';
          default:
            return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeElectionsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.helium.io/v1/elections/current',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });
  });

  describe('submitVote', () => {
    it('should submit vote successfully', async () => {
      const mockResponse = {
        proposal_id: 'proposal-123',
        vote: 'yes',
        signature: 'signature-hash',
        status: 'submitted',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation':
            return 'submitVote';
          case 'proposalId':
            return 'proposal-123';
          case 'vote':
            return 'yes';
          case 'signature':
            return 'signature-hash';
          default:
            return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeElectionsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.helium.io/v1/votes',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        body: {
          proposal_id: 'proposal-123',
          vote: 'yes',
          signature: 'signature-hash',
        },
        json: true,
      });
    });
  });

  describe('getProposalVotes', () => {
    it('should get proposal votes successfully', async () => {
      const mockResponse = {
        data: [
          {
            voter: 'voter1',
            vote: 'yes',
            timestamp: '2023-01-01T00:00:00Z',
          },
        ],
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation':
            return 'getProposalVotes';
          case 'proposalId':
            return 'proposal-123';
          case 'cursor':
            return '';
          default:
            return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeElectionsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('listProposals', () => {
    it('should list proposals successfully', async () => {
      const mockResponse = {
        data: [
          {
            id: 'proposal-123',
            title: 'Test Proposal',
            status: 'active',
          },
        ],
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation':
            return 'listProposals';
          case 'status':
            return 'active';
          case 'cursor':
            return '';
          default:
            return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeElectionsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('getProposal', () => {
    it('should get proposal successfully', async () => {
      const mockResponse = {
        id: 'proposal-123',
        title: 'Test Proposal',
        status: 'active',
        description: 'Test proposal description',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation':
            return 'getProposal';
          case 'proposalId':
            return 'proposal-123';
          default:
            return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeElectionsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.helium.io/v1/proposals/proposal-123',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });
  });
});
});
