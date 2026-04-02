/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-heliumnetwork/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class HeliumNetwork implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Helium Network',
    name: 'heliumnetwork',
    icon: 'file:heliumnetwork.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Helium Network API',
    defaults: {
      name: 'Helium Network',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'heliumnetworkApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Account',
            value: 'account',
          },
          {
            name: 'Hotspot',
            value: 'hotspot',
          },
          {
            name: 'Block',
            value: 'block',
          },
          {
            name: 'Transaction',
            value: 'transaction',
          },
          {
            name: 'City',
            value: 'city',
          },
          {
            name: 'Validator',
            value: 'validator',
          },
          {
            name: 'Election',
            value: 'election',
          },
          {
            name: 'Accounts',
            value: 'accounts',
          },
          {
            name: 'Hotspots',
            value: 'hotspots',
          },
          {
            name: 'Validators',
            value: 'validators',
          },
          {
            name: 'Rewards',
            value: 'rewards',
          },
          {
            name: 'Blockchain',
            value: 'blockchain',
          },
          {
            name: 'Elections',
            value: 'elections',
          }
        ],
        default: 'account',
      },
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['account'],
		},
	},
	options: [
		{
			name: 'Get Account',
			value: 'getAccount',
			description: 'Get account details by address',
			action: 'Get account details',
		},
		{
			name: 'Get Account Activity',
			value: 'getAccountActivity',
			description: 'Get account transaction activity',
			action: 'Get account activity',
		},
		{
			name: 'Get Account Rewards',
			value: 'getAccountRewards',
			description: 'Get account reward history',
			action: 'Get account rewards',
		},
		{
			name: 'Get Account Rewards Sum',
			value: 'getAccountRewardsSum',
			description: 'Get total rewards for account',
			action: 'Get account rewards sum',
		},
		{
			name: 'Get Account Hotspots',
			value: 'getAccountHotspots',
			description: 'Get hotspots owned by account',
			action: 'Get account hotspots',
		},
		{
			name: 'Get Account Validators',
			value: 'getAccountValidators',
			description: 'Get validators owned by account',
			action: 'Get account validators',
		},
		{
			name: 'Get Rich Accounts',
			value: 'getRichAccounts',
			description: 'Get accounts with highest balances',
			action: 'Get rich accounts',
		},
	],
	default: 'getAccount',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['hotspot'],
		},
	},
	options: [
		{
			name: 'Get Hotspot',
			value: 'getHotspot',
			description: 'Get hotspot details by address',
			action: 'Get hotspot details',
		},
		{
			name: 'Get Hotspots',
			value: 'getHotspots',
			description: 'Get list of all hotspots',
			action: 'Get all hotspots',
		},
		{
			name: 'Get Hotspot Activity',
			value: 'getHotspotActivity',
			description: 'Get hotspot activity history',
			action: 'Get hotspot activity',
		},
		{
			name: 'Get Hotspot Rewards',
			value: 'getHotspotRewards',
			description: 'Get hotspot reward history',
			action: 'Get hotspot rewards',
		},
		{
			name: 'Get Hotspot Rewards Sum',
			value: 'getHotspotRewardsSum',
			description: 'Get total rewards for hotspot',
			action: 'Get hotspot rewards sum',
		},
		{
			name: 'Get Hotspot Witnesses',
			value: 'getHotspotWitnesses',
			description: 'Get hotspots that witnessed this hotspot',
			action: 'Get hotspot witnesses',
		},
		{
			name: 'Get Hotspot Witnessed',
			value: 'getHotspotWitnessed',
			description: 'Get hotspots witnessed by this hotspot',
			action: 'Get hotspot witnessed',
		},
		{
			name: 'Get Hotspot by Name',
			value: 'getHotspotByName',
			description: 'Get hotspot by animal name',
			action: 'Get hotspot by name',
		},
	],
	default: 'getHotspot',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['block'],
		},
	},
	options: [
		{
			name: 'Get Block',
			value: 'getBlock',
			description: 'Get block by height',
			action: 'Get a block',
		},
		{
			name: 'Get Blocks',
			value: 'getBlocks',
			description: 'Get list of blocks',
			action: 'Get blocks',
		},
		{
			name: 'Get Block Transactions',
			value: 'getBlockTransactions',
			description: 'Get transactions in a block',
			action: 'Get block transactions',
		},
		{
			name: 'Get Block Stats',
			value: 'getBlockStats',
			description: 'Get blockchain statistics',
			action: 'Get block statistics',
		},
	],
	default: 'getBlock',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['transaction'] } },
  options: [
    { name: 'Get Transaction', value: 'getTransaction', description: 'Get transaction by hash', action: 'Get transaction' },
    { name: 'Get Transactions', value: 'getTransactions', description: 'Get list of transactions', action: 'Get transactions' },
    { name: 'Get Pending Transactions', value: 'getPendingTransactions', description: 'Get pending transactions', action: 'Get pending transactions' }
  ],
  default: 'getTransaction',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['city'] } },
  options: [
    { name: 'Get Cities', value: 'getCities', description: 'Get list of cities with hotspots', action: 'Get cities' },
    { name: 'Get City', value: 'getCity', description: 'Get city details by ID', action: 'Get city by ID' },
    { name: 'Get City Hotspots', value: 'getCityHotspots', description: 'Get hotspots in a city', action: 'Get hotspots in city' }
  ],
  default: 'getCities',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['validator'] } },
	options: [
		{
			name: 'Get Validators',
			value: 'getValidators',
			description: 'Get list of validators',
			action: 'Get validators',
		},
		{
			name: 'Get Validator',
			value: 'getValidator',
			description: 'Get validator details by address',
			action: 'Get validator',
		},
		{
			name: 'Get Validator Activity',
			value: 'getValidatorActivity',
			description: 'Get validator activity history',
			action: 'Get validator activity',
		},
		{
			name: 'Get Validator Rewards',
			value: 'getValidatorRewards',
			description: 'Get validator reward history',
			action: 'Get validator rewards',
		},
	],
	default: 'getValidators',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['election'] } },
	options: [
		{ name: 'Get Elections', value: 'getElections', description: 'Get list of elections', action: 'Get elections' },
		{ name: 'Get Election', value: 'getElection', description: 'Get election details by hash', action: 'Get election' }
	],
	default: 'getElections',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['hotspots'],
    },
  },
  options: [
    {
      name: 'List Hotspots',
      value: 'listHotspots',
      description: 'Get all hotspots with pagination',
      action: 'List hotspots',
    },
    {
      name: 'Get Hotspot',
      value: 'getHotspot',
      description: 'Get specific hotspot by address',
      action: 'Get hotspot',
    },
    {
      name: 'Get Hotspot Activity',
      value: 'getHotspotActivity',
      description: 'Get hotspot activity history',
      action: 'Get hotspot activity',
    },
    {
      name: 'Get Hotspot Rewards',
      value: 'getHotspotRewards',
      description: 'Get rewards earned by hotspot',
      action: 'Get hotspot rewards',
    },
    {
      name: 'Get Hotspot Witnesses',
      value: 'getHotspotWitnesses',
      description: 'Get hotspots witnessed by this hotspot',
      action: 'Get hotspot witnesses',
    },
    {
      name: 'Get Hotspot Challenged',
      value: 'getHotspotChallenged',
      description: 'Get challenge activity for hotspot',
      action: 'Get hotspot challenged',
    },
    {
      name: 'Update Hotspot',
      value: 'updateHotspot',
      description: 'Update hotspot settings like name or location',
      action: 'Update hotspot',
    },
  ],
  default: 'listHotspots',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['accounts'],
    },
  },
  options: [
    {
      name: 'Get Account',
      value: 'getAccount',
      description: 'Get account information by address',
      action: 'Get account information',
    },
    {
      name: 'Get Account Hotspots',
      value: 'getAccountHotspots',
      description: 'Get hotspots owned by account',
      action: 'Get account hotspots',
    },
    {
      name: 'Get Account Validators',
      value: 'getAccountValidators',
      description: 'Get validators owned by account',
      action: 'Get account validators',
    },
    {
      name: 'Get Account Activity',
      value: 'getAccountActivity',
      description: 'Get account transaction activity',
      action: 'Get account activity',
    },
    {
      name: 'Get Account Rewards',
      value: 'getAccountRewards',
      description: 'Get rewards earned by account',
      action: 'Get account rewards',
    },
    {
      name: 'Get Pending Transactions',
      value: 'getPendingTransactions',
      description: 'Get pending transactions for account',
      action: 'Get pending transactions',
    },
    {
      name: 'Submit Transaction',
      value: 'submitTransaction',
      description: 'Submit a signed transaction',
      action: 'Submit transaction',
    },
  ],
  default: 'getAccount',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['validators'],
    },
  },
  options: [
    {
      name: 'List Validators',
      value: 'listValidators',
      description: 'Get all validators with pagination',
      action: 'List validators',
    },
    {
      name: 'Get Validator',
      value: 'getValidator',
      description: 'Get specific validator by address',
      action: 'Get validator',
    },
    {
      name: 'Get Validator Activity',
      value: 'getValidatorActivity',
      description: 'Get validator activity and consensus participation',
      action: 'Get validator activity',
    },
    {
      name: 'Get Validator Rewards',
      value: 'getValidatorRewards',
      description: 'Get rewards earned by validator',
      action: 'Get validator rewards',
    },
    {
      name: 'Create Validator',
      value: 'createValidator',
      description: 'Stake HNT to create a new validator',
      action: 'Create validator',
    },
    {
      name: 'Update Validator',
      value: 'updateValidator',
      description: 'Update validator settings',
      action: 'Update validator',
    },
    {
      name: 'Unstake Validator',
      value: 'unstakeValidator',
      description: 'Initiate validator unstaking process',
      action: 'Unstake validator',
    },
  ],
  default: 'listValidators',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['rewards'],
    },
  },
  options: [
    {
      name: 'Get Rewards Sum',
      value: 'getRewardsSum',
      description: 'Get total rewards for time period',
      action: 'Get rewards sum',
    },
    {
      name: 'Get Block Rewards By Account',
      value: 'getBlockRewardsByAccount',
      description: 'Get reward distribution for specific block by account',
      action: 'Get block rewards by account',
    },
    {
      name: 'Get Block Rewards By Hotspot',
      value: 'getBlockRewardsByHotspot',
      description: 'Get hotspot rewards for specific block',
      action: 'Get block rewards by hotspot',
    },
    {
      name: 'Claim Rewards',
      value: 'claimRewards',
      description: 'Claim pending rewards to wallet',
      action: 'Claim rewards',
    },
    {
      name: 'Get Oracle Price',
      value: 'getOraclePrice',
      description: 'Get current HNT oracle price',
      action: 'Get oracle price',
    },
    {
      name: 'Get Reward Predictions',
      value: 'getRewardPredictions',
      description: 'Get predicted rewards for next epoch',
      action: 'Get reward predictions',
    },
  ],
  default: 'getRewardsSum',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['blockchain'],
    },
  },
  options: [
    {
      name: 'List Blocks',
      value: 'listBlocks',
      description: 'Get recent blocks with pagination',
      action: 'List blocks',
    },
    {
      name: 'Get Block',
      value: 'getBlock',
      description: 'Get specific block by height',
      action: 'Get block',
    },
    {
      name: 'Get Block Transactions',
      value: 'getBlockTransactions',
      description: 'Get transactions in a block',
      action: 'Get block transactions',
    },
    {
      name: 'Get Transaction',
      value: 'getTransaction',
      description: 'Get transaction details by hash',
      action: 'Get transaction',
    },
    {
      name: 'Get Pending Transactions',
      value: 'getPendingTransactions',
      description: 'Get pending transaction pool',
      action: 'Get pending transactions',
    },
    {
      name: 'Broadcast Transaction',
      value: 'broadcastTransaction',
      description: 'Broadcast signed transaction to network',
      action: 'Broadcast transaction',
    },
    {
      name: 'Get Network Stats',
      value: 'getNetworkStats',
      description: 'Get current network statistics',
      action: 'Get network stats',
    },
  ],
  default: 'listBlocks',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['elections'],
    },
  },
  options: [
    {
      name: 'List Elections',
      value: 'listElections',
      description: 'Get consensus group elections',
      action: 'List elections',
    },
    {
      name: 'Get Election',
      value: 'getElection',
      description: 'Get specific election by block height',
      action: 'Get election',
    },
    {
      name: 'Get Current Election',
      value: 'getCurrentElection',
      description: 'Get current consensus group',
      action: 'Get current election',
    },
    {
      name: 'Submit Vote',
      value: 'submitVote',
      description: 'Submit governance vote',
      action: 'Submit vote',
    },
    {
      name: 'Get Proposal Votes',
      value: 'getProposalVotes',
      description: 'Get votes for governance proposal',
      action: 'Get proposal votes',
    },
    {
      name: 'List Proposals',
      value: 'listProposals',
      description: 'Get active governance proposals',
      action: 'List proposals',
    },
    {
      name: 'Get Proposal',
      value: 'getProposal',
      description: 'Get specific governance proposal',
      action: 'Get proposal',
    },
  ],
  default: 'listElections',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccount'],
		},
	},
	default: '',
	placeholder: '13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh8eSBG53s5bx',
	description: 'The base58 encoded account address',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountActivity'],
		},
	},
	default: '',
	placeholder: '13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh8eSBG53s5bx',
	description: 'The base58 encoded account address',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountActivity'],
		},
	},
	default: '',
	description: 'Cursor for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountActivity'],
		},
	},
	default: 100,
	description: 'Maximum number of items to return',
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountRewards'],
		},
	},
	default: '',
	placeholder: '13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh8eSBG53s5bx',
	description: 'The base58 encoded account address',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountRewards'],
		},
	},
	default: '',
	description: 'Cursor for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountRewards'],
		},
	},
	default: 100,
	description: 'Maximum number of items to return',
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
},
{
	displayName: 'Min Time',
	name: 'minTime',
	type: 'dateTime',
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountRewards'],
		},
	},
	default: '',
	description: 'Start time for rewards (ISO 8601 format)',
},
{
	displayName: 'Max Time',
	name: 'maxTime',
	type: 'dateTime',
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountRewards'],
		},
	},
	default: '',
	description: 'End time for rewards (ISO 8601 format)',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountRewardsSum'],
		},
	},
	default: '',
	placeholder: '13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh8eSBG53s5bx',
	description: 'The base58 encoded account address',
},
{
	displayName: 'Min Time',
	name: 'minTime',
	type: 'dateTime',
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountRewardsSum'],
		},
	},
	default: '',
	description: 'Start time for rewards sum (ISO 8601 format)',
},
{
	displayName: 'Max Time',
	name: 'maxTime',
	type: 'dateTime',
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountRewardsSum'],
		},
	},
	default: '',
	description: 'End time for rewards sum (ISO 8601 format)',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountHotspots'],
		},
	},
	default: '',
	placeholder: '13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh8eSBG53s5bx',
	description: 'The base58 encoded account address',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountHotspots'],
		},
	},
	default: '',
	description: 'Cursor for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountHotspots'],
		},
	},
	default: 100,
	description: 'Maximum number of items to return',
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountValidators'],
		},
	},
	default: '',
	placeholder: '13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh8eSBG53s5bx',
	description: 'The base58 encoded account address',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountValidators'],
		},
	},
	default: '',
	description: 'Cursor for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccountValidators'],
		},
	},
	default: 100,
	description: 'Maximum number of items to return',
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getRichAccounts'],
		},
	},
	default: '',
	description: 'Cursor for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getRichAccounts'],
		},
	},
	default: 100,
	description: 'Maximum number of items to return',
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspot'],
		},
	},
	default: '',
	description: 'The hotspot address in base58 format',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspots'],
		},
	},
	default: '',
	description: 'Cursor for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspots'],
		},
	},
	default: 100,
	description: 'Maximum number of results to return',
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotActivity'],
		},
	},
	default: '',
	description: 'The hotspot address in base58 format',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotActivity'],
		},
	},
	default: '',
	description: 'Cursor for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotActivity'],
		},
	},
	default: 100,
	description: 'Maximum number of results to return',
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotRewards'],
		},
	},
	default: '',
	description: 'The hotspot address in base58 format',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotRewards'],
		},
	},
	default: '',
	description: 'Cursor for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotRewards'],
		},
	},
	default: 100,
	description: 'Maximum number of results to return',
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
},
{
	displayName: 'Min Time',
	name: 'minTime',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotRewards'],
		},
	},
	default: '',
	description: 'Minimum timestamp for rewards (ISO 8601 format)',
},
{
	displayName: 'Max Time',
	name: 'maxTime',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotRewards'],
		},
	},
	default: '',
	description: 'Maximum timestamp for rewards (ISO 8601 format)',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotRewardsSum'],
		},
	},
	default: '',
	description: 'The hotspot address in base58 format',
},
{
	displayName: 'Min Time',
	name: 'minTime',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotRewardsSum'],
		},
	},
	default: '',
	description: 'Minimum timestamp for rewards (ISO 8601 format)',
},
{
	displayName: 'Max Time',
	name: 'maxTime',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotRewardsSum'],
		},
	},
	default: '',
	description: 'Maximum timestamp for rewards (ISO 8601 format)',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotWitnesses'],
		},
	},
	default: '',
	description: 'The hotspot address in base58 format',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotWitnesses'],
		},
	},
	default: '',
	description: 'Cursor for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotWitnesses'],
		},
	},
	default: 100,
	description: 'Maximum number of results to return',
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotWitnessed'],
		},
	},
	default: '',
	description: 'The hotspot address in base58 format',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotWitnessed'],
		},
	},
	default: '',
	description: 'Cursor for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotWitnessed'],
		},
	},
	default: 100,
	description: 'Maximum number of results to return',
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
},
{
	displayName: 'Name',
	name: 'name',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['hotspot'],
			operation: ['getHotspotByName'],
		},
	},
	default: '',
	description: 'The hotspot animal name (e.g., "tall-plum-griffin")',
},
{
	displayName: 'Block Height',
	name: 'height',
	type: 'number',
	required: true,
	displayOptions: {
		show: {
			resource: ['block'],
			operation: ['getBlock'],
		},
	},
	default: 1,
	description: 'The height of the block to retrieve',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['block'],
			operation: ['getBlocks'],
		},
	},
	default: '',
	description: 'Cursor for pagination (optional)',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['block'],
			operation: ['getBlocks'],
		},
	},
	default: 100,
	description: 'Maximum number of blocks to return (max 1000)',
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
},
{
	displayName: 'Block Height',
	name: 'height',
	type: 'number',
	required: true,
	displayOptions: {
		show: {
			resource: ['block'],
			operation: ['getBlockTransactions'],
		},
	},
	default: 1,
	description: 'The height of the block to get transactions from',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['block'],
			operation: ['getBlockTransactions'],
		},
	},
	default: '',
	description: 'Cursor for pagination (optional)',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['block'],
			operation: ['getBlockTransactions'],
		},
	},
	default: 100,
	description: 'Maximum number of transactions to return (max 1000)',
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
},
{
  displayName: 'Transaction Hash',
  name: 'hash',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['transaction'],
      operation: ['getTransaction']
    }
  },
  default: '',
  description: 'The transaction hash to retrieve'
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['transaction'],
      operation: ['getTransactions', 'getPendingTransactions']
    }
  },
  default: '',
  description: 'Cursor for pagination (optional)'
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['transaction'],
      operation: ['getTransactions', 'getPendingTransactions']
    }
  },
  default: 100,
  description: 'Maximum number of transactions to return',
  typeOptions: {
    minValue: 1,
    maxValue: 1000
  }
},
{
  displayName: 'Search',
  name: 'search',
  type: 'string',
  default: '',
  description: 'Search for cities by name',
  displayOptions: {
    show: {
      resource: ['city'],
      operation: ['getCities'],
    },
  },
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  default: '',
  description: 'Cursor for pagination',
  displayOptions: {
    show: {
      resource: ['city'],
      operation: ['getCities'],
    },
  },
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  default: 100,
  typeOptions: {
    minValue: 1,
    maxValue: 1000,
  },
  description: 'Maximum number of results to return',
  displayOptions: {
    show: {
      resource: ['city'],
      operation: ['getCities'],
    },
  },
},
{
  displayName: 'City ID',
  name: 'cityId',
  type: 'string',
  required: true,
  default: '',
  description: 'The ID of the city',
  displayOptions: {
    show: {
      resource: ['city'],
      operation: ['getCity', 'getCityHotspots'],
    },
  },
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  default: '',
  description: 'Cursor for pagination',
  displayOptions: {
    show: {
      resource: ['city'],
      operation: ['getCityHotspots'],
    },
  },
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  default: 100,
  typeOptions: {
    minValue: 1,
    maxValue: 1000,
  },
  description: 'Maximum number of results to return',
  displayOptions: {
    show: {
      resource: ['city'],
      operation: ['getCityHotspots'],
    },
  },
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['validator'],
			operation: ['getValidators'],
		},
	},
	default: '',
	description: 'Cursor for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['validator'],
			operation: ['getValidators'],
		},
	},
	default: 100,
	description: 'Maximum number of validators to return',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['validator'],
			operation: ['getValidator'],
		},
	},
	default: '',
	description: 'Validator address in base58 format',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['validator'],
			operation: ['getValidatorActivity'],
		},
	},
	default: '',
	description: 'Validator address in base58 format',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['validator'],
			operation: ['getValidatorActivity'],
		},
	},
	default: '',
	description: 'Cursor for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['validator'],
			operation: ['getValidatorActivity'],
		},
	},
	default: 100,
	description: 'Maximum number of activity records to return',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['validator'],
			operation: ['getValidatorRewards'],
		},
	},
	default: '',
	description: 'Validator address in base58 format',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['validator'],
			operation: ['getValidatorRewards'],
		},
	},
	default: '',
	description: 'Cursor for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['validator'],
			operation: ['getValidatorRewards'],
		},
	},
	default: 100,
	description: 'Maximum number of reward records to return',
},
{
	displayName: 'Min Time',
	name: 'minTime',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['validator'],
			operation: ['getValidatorRewards'],
		},
	},
	default: '',
	description: 'Minimum time filter (ISO 8601 format)',
},
{
	displayName: 'Max Time',
	name: 'maxTime',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['validator'],
			operation: ['getValidatorRewards'],
		},
	},
	default: '',
	description: 'Maximum time filter (ISO 8601 format)',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	default: '',
	description: 'Cursor for pagination',
	displayOptions: { show: { resource: ['election'], operation: ['getElections'] } },
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 20,
	description: 'Number of results to return',
	displayOptions: { show: { resource: ['election'], operation: ['getElections'] } },
},
{
	displayName: 'Hash',
	name: 'hash',
	type: 'string',
	required: true,
	default: '',
	description: 'Election hash to retrieve',
	displayOptions: { show: { resource: ['election'], operation: ['getElection'] } },
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['listHotspots'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['listHotspots'],
    },
  },
  default: 100,
  description: 'Number of results to return',
},
{
  displayName: 'Hotspot Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspot'],
    },
  },
  default: '',
  description: 'The hotspot address',
},
{
  displayName: 'Hotspot Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotActivity'],
    },
  },
  default: '',
  description: 'The hotspot address',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotActivity'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotActivity'],
    },
  },
  default: 100,
  description: 'Number of results to return',
},
{
  displayName: 'Hotspot Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotRewards'],
    },
  },
  default: '',
  description: 'The hotspot address',
},
{
  displayName: 'Min Time',
  name: 'min_time',
  type: 'dateTime',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotRewards'],
    },
  },
  default: '',
  description: 'Minimum time for rewards query',
},
{
  displayName: 'Max Time',
  name: 'max_time',
  type: 'dateTime',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotRewards'],
    },
  },
  default: '',
  description: 'Maximum time for rewards query',
},
{
  displayName: 'Hotspot Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotWitnesses'],
    },
  },
  default: '',
  description: 'The hotspot address',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotWitnesses'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Hotspot Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotChallenged'],
    },
  },
  default: '',
  description: 'The hotspot address',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotChallenged'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Hotspot Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['updateHotspot'],
    },
  },
  default: '',
  description: 'The hotspot address',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['updateHotspot'],
    },
  },
  default: '',
  description: 'New name for the hotspot',
},
{
  displayName: 'Latitude',
  name: 'lat',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['updateHotspot'],
    },
  },
  default: 0,
  description: 'Latitude coordinate',
},
{
  displayName: 'Longitude',
  name: 'lng',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['updateHotspot'],
    },
  },
  default: 0,
  description: 'Longitude coordinate',
},
{
  displayName: 'Account Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['accounts'],
      operation: ['getAccount', 'getAccountHotspots', 'getAccountValidators', 'getAccountActivity', 'getAccountRewards', 'getPendingTransactions', 'submitTransaction'],
    },
  },
  default: '',
  description: 'The Helium account address',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['accounts'],
      operation: ['getAccountHotspots', 'getAccountValidators', 'getAccountActivity', 'getAccountRewards'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['accounts'],
      operation: ['getAccountHotspots', 'getAccountValidators', 'getAccountActivity'],
    },
  },
  default: 100,
  description: 'Maximum number of results to return',
  typeOptions: {
    minValue: 1,
    maxValue: 1000,
  },
},
{
  displayName: 'Filter Types',
  name: 'filterTypes',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['accounts'],
      operation: ['getAccountActivity'],
    },
  },
  default: '',
  description: 'Comma-separated list of transaction types to filter by',
  placeholder: 'payment_v1,rewards_v1',
},
{
  displayName: 'Min Time',
  name: 'minTime',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['accounts'],
      operation: ['getAccountRewards'],
    },
  },
  default: '',
  description: 'Minimum time for rewards query (ISO 8601 format)',
  placeholder: '2023-01-01T00:00:00Z',
},
{
  displayName: 'Max Time',
  name: 'maxTime',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['accounts'],
      operation: ['getAccountRewards'],
    },
  },
  default: '',
  description: 'Maximum time for rewards query (ISO 8601 format)',
  placeholder: '2023-12-31T23:59:59Z',
},
{
  displayName: 'Transaction Data',
  name: 'txn',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['accounts'],
      operation: ['submitTransaction'],
    },
  },
  default: '',
  description: 'The signed transaction data to submit',
  typeOptions: {
    rows: 4,
  },
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['listValidators'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['listValidators', 'getValidatorActivity'],
    },
  },
  default: 20,
  description: 'Maximum number of results to return',
},
{
  displayName: 'Validator Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['getValidator', 'getValidatorActivity', 'getValidatorRewards', 'updateValidator', 'unstakeValidator'],
    },
  },
  default: '',
  description: 'The validator address',
},
{
  displayName: 'Validator Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['createValidator'],
    },
  },
  default: '',
  description: 'The validator address to create',
},
{
  displayName: 'Activity Cursor',
  name: 'cursor',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['getValidatorActivity'],
    },
  },
  default: '',
  description: 'Cursor for paginating activity results',
},
{
  displayName: 'Min Time',
  name: 'min_time',
  type: 'dateTime',
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['getValidatorRewards'],
    },
  },
  default: '',
  description: 'Minimum time for reward period',
},
{
  displayName: 'Max Time',
  name: 'max_time',
  type: 'dateTime',
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['getValidatorRewards'],
    },
  },
  default: '',
  description: 'Maximum time for reward period',
},
{
  displayName: 'Stake Amount',
  name: 'stake',
  type: 'number',
  required: true,
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['createValidator'],
    },
  },
  default: 10000,
  description: 'Amount of HNT to stake (minimum 10,000 HNT)',
},
{
  displayName: 'Validator Name',
  name: 'name',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['updateValidator'],
    },
  },
  default: '',
  description: 'New name for the validator',
},
{
  displayName: 'Min Time',
  name: 'minTime',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['getRewardsSum'],
    },
  },
  default: '',
  description: 'Minimum time for the reward period (ISO 8601 format)',
},
{
  displayName: 'Max Time',
  name: 'maxTime',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['getRewardsSum'],
    },
  },
  default: '',
  description: 'Maximum time for the reward period (ISO 8601 format)',
},
{
  displayName: 'Bucket',
  name: 'bucket',
  type: 'options',
  required: true,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['getRewardsSum'],
    },
  },
  options: [
    { name: 'Hour', value: 'hour' },
    { name: 'Day', value: 'day' },
    { name: 'Week', value: 'week' },
    { name: 'Month', value: 'month' },
  ],
  default: 'day',
  description: 'Time bucket for grouping rewards',
},
{
  displayName: 'Block Number',
  name: 'block',
  type: 'number',
  required: true,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['getBlockRewardsByAccount', 'getBlockRewardsByHotspot'],
    },
  },
  default: 0,
  description: 'The block number to get rewards for',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['getBlockRewardsByAccount', 'getBlockRewardsByHotspot'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['getBlockRewardsByAccount', 'getBlockRewardsByHotspot'],
    },
  },
  default: 100,
  description: 'Maximum number of results to return',
},
{
  displayName: 'Account Address',
  name: 'account',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['claimRewards'],
    },
  },
  default: '',