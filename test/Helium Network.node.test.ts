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

    it('should define 7 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(7);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(7);
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
describe('Account Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({ apiKey: 'test-key', baseUrl: 'https://api.helium.io/v1' }),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('getAccount', () => {
		it('should get account details successfully', async () => {
			const mockResponse = { data: { address: '13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh8eSBG53s5bx', balance: 1000000 } };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAccount')
				.mockReturnValueOnce('13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh8eSBG53s5bx');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.helium.io/v1/accounts/13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh8eSBG53s5bx',
				json: true,
			});
		});

		it('should handle getAccount errors', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAccount')
				.mockReturnValueOnce('invalid-address');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Invalid address'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'Invalid address' }, pairedItem: { item: 0 } }]);
		});
	});

	describe('getAccountActivity', () => {
		it('should get account activity successfully', async () => {
			const mockResponse = { data: [{ hash: 'tx123', type: 'payment' }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAccountActivity')
				.mockReturnValueOnce('13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh8eSBG53s5bx')
				.mockReturnValueOnce('cursor123')
				.mockReturnValueOnce(50);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('getAccountRewards', () => {
		it('should get account rewards successfully', async () => {
			const mockResponse = { data: [{ amount: 500000, timestamp: '2023-01-01T00:00:00Z' }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAccountRewards')
				.mockReturnValueOnce('13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh8eSBG53s5bx')
				.mockReturnValueOnce('')
				.mockReturnValueOnce(100)
				.mockReturnValueOnce('2023-01-01T00:00:00Z')
				.mockReturnValueOnce('2023-01-31T23:59:59Z');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('getRichAccounts', () => {
		it('should get rich accounts successfully', async () => {
			const mockResponse = { data: [{ address: 'addr1', balance: 10000000 }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getRichAccounts')
				.mockReturnValueOnce('')
				.mockReturnValueOnce(10);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});
});

describe('Hotspot Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	test('should get hotspot by address successfully', async () => {
		const mockResponse = { data: { address: '13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh9L3eJGw', name: 'tall-plum-griffin' } };
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'getHotspot';
			if (param === 'address') return '13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh9L3eJGw';
		});
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeHotspotOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://api.helium.io/v1/hotspots/13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh9L3eJGw',
			headers: { 'Content-Type': 'application/json' },
			json: true,
		});
		expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
	});

	test('should get all hotspots with pagination', async () => {
		const mockResponse = { data: [], cursor: 'next-cursor' };
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'getHotspots';
			if (param === 'cursor') return 'test-cursor';
			if (param === 'limit') return 50;
		});
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeHotspotOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://api.helium.io/v1/hotspots?cursor=test-cursor&limit=50',
			headers: { 'Content-Type': 'application/json' },
			json: true,
		});
		expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
	});

	test('should get hotspot activity', async () => {
		const mockResponse = { data: [], cursor: null };
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'getHotspotActivity';
			if (param === 'address') return '13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh9L3eJGw';
			if (param === 'limit') return 100;
		});
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeHotspotOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://api.helium.io/v1/hotspots/13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh9L3eJGw/activity?limit=100',
			headers: { 'Content-Type': 'application/json' },
			json: true,
		});
		expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
	});

	test('should get hotspot rewards with time filters', async () => {
		const mockResponse = { data: [], cursor: null };
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'getHotspotRewards';
			if (param === 'address') return '13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh9L3eJGw';
			if (param === 'minTime') return '2023-01-01T00:00:00Z';
			if (param === 'maxTime') return '2023-12-31T23:59:59Z';
		});
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeHotspotOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://api.helium.io/v1/hotspots/13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh9L3eJGw/rewards?min_time=2023-01-01T00%3A00%3A00Z&max_time=2023-12-31T23%3A59%3A59Z',
			headers: { 'Content-Type': 'application/json' },
			json: true,
		});
		expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
	});

	test('should get hotspot by name', async () => {
		const mockResponse = { data: { address: '13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh9L3eJGw', name: 'tall-plum-griffin' } };
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'getHotspotByName';
			if (param === 'name') return 'tall-plum-griffin';
		});
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeHotspotOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://api.helium.io/v1/hotspots/name/tall-plum-griffin',
			headers: { 'Content-Type': 'application/json' },
			json: true,
		});
		expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
	});

	test('should handle API errors gracefully when continueOnFail is true', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'getHotspot';
			if (param === 'address') return 'invalid-address';
		});
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Invalid address format'));
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);

		const result = await executeHotspotOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { error: 'Invalid address format' }, pairedItem: { item: 0 } }]);
	});

	test('should throw error for unknown operation', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValue('unknownOperation');

		await expect(executeHotspotOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('Unknown operation: unknownOperation');
	});
});

describe('Block Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
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

	describe('getBlock', () => {
		it('should get block by height successfully', async () => {
			const mockResponse = { data: { height: 123, hash: 'block-hash' } };
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getBlock');
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(123);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeBlockOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.helium.io/v1/blocks/123',
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});

		it('should handle getBlock error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getBlock');
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(123);
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Block not found'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeBlockOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'Block not found' }, pairedItem: { item: 0 } }]);
		});
	});

	describe('getBlocks', () => {
		it('should get blocks successfully', async () => {
			const mockResponse = { data: [{ height: 123 }, { height: 124 }] };
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getBlocks');
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('');
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(100);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeBlockOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.helium.io/v1/blocks?limit=100',
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('getBlockTransactions', () => {
		it('should get block transactions successfully', async () => {
			const mockResponse = { data: [{ hash: 'tx1' }, { hash: 'tx2' }] };
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getBlockTransactions');
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(123);
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('cursor123');
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(50);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeBlockOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.helium.io/v1/blocks/123/transactions?limit=50&cursor=cursor123',
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('getBlockStats', () => {
		it('should get block stats successfully', async () => {
			const mockResponse = { data: { total_blocks: 1000, avg_block_time: 60 } };
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getBlockStats');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeBlockOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.helium.io/v1/blocks/stats',
				json: true,
			});
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});
});

describe('Transaction Resource', () => {
  let mockExecuteFunctions: any;
  
  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ apiKey: 'test-key', baseUrl: 'https://api.helium.io/v1' }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { httpRequest: jest.fn(), requestWithAuthentication: jest.fn() },
    };
  });

  describe('getTransaction', () => {
    it('should get transaction by hash successfully', async () => {
      const mockTransaction = {
        data: {
          hash: 'test-hash-123',
          type: 'payment_v2',
          height: 123456
        }
      };
      
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getTransaction')
        .mockReturnValueOnce('test-hash-123');
      
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockTransaction);
      
      const result = await executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.helium.io/v1/transactions/test-hash-123',
        headers: { 'Accept': 'application/json' },
        json: true
      });
      expect(result[0].json).toEqual(mockTransaction);
    });

    it('should handle missing hash error', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getTransaction')
        .mockReturnValueOnce('');
      
      await expect(executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }]))
        .rejects.toThrow('Transaction hash is required');
    });
  });

  describe('getTransactions', () => {
    it('should get transactions list successfully', async () => {
      const mockTransactions = {
        data: [
          { hash: 'hash1', type: 'payment_v2' },
          { hash: 'hash2', type: 'transfer_v1' }
        ],
        cursor: 'next-cursor'
      };
      
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getTransactions')
        .mockReturnValueOnce('')
        .mockReturnValueOnce(50);
      
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockTransactions);
      
      const result = await executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.helium.io/v1/transactions?limit=50',
        headers: { 'Accept': 'application/json' },
        json: true
      });
      expect(result[0].json).toEqual(mockTransactions);
    });

    it('should handle API error in getTransactions', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getTransactions')
        .mockReturnValueOnce('')
        .mockReturnValueOnce(100);
      
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);
      
      const result = await executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result[0].json).toEqual({ error: 'API Error' });
    });
  });

  describe('getPendingTransactions', () => {
    it('should get pending transactions successfully', async () => {
      const mockPending = {
        data: [
          { hash: 'pending1', type: 'payment_v2' }
        ]
      };
      
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getPendingTransactions')
        .mockReturnValueOnce('test-cursor')
        .mockReturnValueOnce(25);
      
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockPending);
      
      const result = await executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.helium.io/v1/pending_transactions?cursor=test-cursor&limit=25',
        headers: { 'Accept': 'application/json' },
        json: true
      });
      expect(result[0].json).toEqual(mockPending);
    });
  });
});

describe('City Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ apiKey: 'test-key', baseUrl: 'https://api.helium.io/v1' }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { httpRequest: jest.fn(), requestWithAuthentication: jest.fn() },
    };
  });

  describe('getCities', () => {
    it('should get cities successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getCities')
        .mockReturnValueOnce('san francisco')
        .mockReturnValueOnce('')
        .mockReturnValueOnce(100);

      const mockResponse = {
        data: [{ id: 'city1', name: 'San Francisco', hotspot_count: 150 }],
        cursor: 'next_cursor'
      };

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeCityOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.helium.io/v1/cities?search=san+francisco&limit=100',
        json: true,
      });
    });

    it('should handle getCities error', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('getCities');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeCityOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('getCity', () => {
    it('should get city by ID successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getCity')
        .mockReturnValueOnce('san-francisco-california-united-states');

      const mockResponse = {
        data: { id: 'san-francisco-california-united-states', name: 'San Francisco', hotspot_count: 150 }
      };

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeCityOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.helium.io/v1/cities/san-francisco-california-united-states',
        json: true,
      });
    });

    it('should handle getCity error', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('getCity');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('City not found'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeCityOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: { error: 'City not found' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('getCityHotspots', () => {
    it('should get city hotspots successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getCityHotspots')
        .mockReturnValueOnce('san-francisco-california-united-states')
        .mockReturnValueOnce('')
        .mockReturnValueOnce(50);

      const mockResponse = {
        data: [
          { address: 'hotspot1', name: 'Amazing Hotspot', location: 'abc123' },
          { address: 'hotspot2', name: 'Cool Hotspot', location: 'def456' }
        ],
        cursor: 'next_cursor'
      };

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeCityOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.helium.io/v1/cities/san-francisco-california-united-states/hotspots?limit=50',
        json: true,
      });
    });

    it('should handle getCityHotspots error', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('getCityHotspots');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Network error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(false);

      await expect(executeCityOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('Network error');
    });
  });
});

describe('Validator Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({ apiKey: 'test-key', baseUrl: 'https://api.helium.io/v1' }),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: { httpRequest: jest.fn(), requestWithAuthentication: jest.fn() },
		};
	});

	describe('getValidators operation', () => {
		it('should get validators successfully', async () => {
			const mockResponse = { data: [{ address: 'validator1' }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getValidators')
				.mockReturnValueOnce('')
				.mockReturnValueOnce(100);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeValidatorOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.helium.io/v1/validators',
				qs: { limit: 100 },
				json: true,
			});
		});

		it('should handle getValidators error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getValidators');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeValidatorOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
		});
	});

	describe('getValidator operation', () => {
		it('should get validator successfully', async () => {
			const mockResponse = { data: { address: 'validator1', stake: '10000' } };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getValidator')
				.mockReturnValueOnce('validator-address-123');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeValidatorOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.helium.io/v1/validators/validator-address-123',
				json: true,
			});
		});
	});

	describe('getValidatorActivity operation', () => {
		it('should get validator activity successfully', async () => {
			const mockResponse = { data: [{ type: 'consensus_group', block: 123456 }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getValidatorActivity')
				.mockReturnValueOnce('validator-address-123')
				.mockReturnValueOnce('')
				.mockReturnValueOnce(50);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeValidatorOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.helium.io/v1/validators/validator-address-123/activity',
				qs: { limit: 50 },
				json: true,
			});
		});
	});

	describe('getValidatorRewards operation', () => {
		it('should get validator rewards successfully', async () => {
			const mockResponse = { data: [{ amount: 1000000, block: 123456 }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getValidatorRewards')
				.mockReturnValueOnce('validator-address-123')
				.mockReturnValueOnce('')
				.mockReturnValueOnce(25)
				.mockReturnValueOnce('2023-01-01T00:00:00Z')
				.mockReturnValueOnce('2023-01-31T23:59:59Z');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeValidatorOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.helium.io/v1/validators/validator-address-123/rewards',
				qs: {
					limit: 25,
					min_time: '2023-01-01T00:00:00Z',
					max_time: '2023-01-31T23:59:59Z',
				},
				json: true,
			});
		});
	});
});

describe('Election Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({ apiKey: 'test-key', baseUrl: 'https://api.helium.io/v1' }),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: { httpRequest: jest.fn(), requestWithAuthentication: jest.fn() },
		};
	});

	describe('getElections operation', () => {
		it('should get elections successfully', async () => {
			const mockElections = { data: [{ hash: 'election1' }], cursor: 'next_cursor' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getElections')
				.mockReturnValueOnce('')
				.mockReturnValueOnce(20);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockElections);

			const result = await executeElectionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.helium.io/v1/elections?limit=20',
				json: true,
			});
			expect(result).toEqual([{ json: mockElections, pairedItem: { item: 0 } }]);
		});

		it('should handle pagination parameters', async () => {
			const mockElections = { data: [{ hash: 'election1' }], cursor: 'next_cursor' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getElections')
				.mockReturnValueOnce('cursor123')
				.mockReturnValueOnce(10);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockElections);

			await executeElectionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.helium.io/v1/elections?cursor=cursor123&limit=10',
				json: true,
			});
		});

		it('should handle errors', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getElections');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeElectionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
		});
	});

	describe('getElection operation', () => {
		it('should get election by hash successfully', async () => {
			const mockElection = { data: { hash: 'election_hash', height: 123 } };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getElection')
				.mockReturnValueOnce('election_hash');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockElection);

			const result = await executeElectionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.helium.io/v1/elections/election_hash',
				json: true,
			});
			expect(result).toEqual([{ json: mockElection, pairedItem: { item: 0 } }]);
		});

		it('should handle errors', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getElection');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Election not found'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeElectionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'Election not found' }, pairedItem: { item: 0 } }]);
		});
	});
});
});
