
import { randomItem, randomItems, randomItemWeightedArray, randomCharacters, randomInt } from './random';

export const adoptRegions = {
	0: [ 4, 69, 76, 79 ],
	4: [ 51, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 100, 101, 102, 103, 104, 105, 106, 107, 133, 186 ],
	69: [ 3, 7 ],
	76: [ 8, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30, 31, 46, 48, 53, 60 ],
	79: [ 18, 19, 27 ]
};

const getCountryList = (geoList) => {
	let countryList = [];

	geoList.forEach((region) => {
		countryList = countryList.concat([...adoptRegions[region]]);
	});

	return countryList;
};

export const regions = {
	global: [ 0 ],
	geography: [ ...adoptRegions[0] ],
	country: getCountryList(adoptRegions[0])
};

export const bannerAccounts = ['00337', '00336', '00369', '00334', '00129', '00027', '00280', '00080'];
export const retailConcepts = ['27', '37', '38', '39', '41', '42', '43', '47', '48', '49', '34'];

// Placeholder filters
const silhouetteCodesByDiv = {'10': ['105', '108', '110', '115', '116', '118', '547', '548', '549', '042', '037', '080', '070', '055', '065', '045', '060', '040', '025', '036', '090', '085', '075', '050', '035', '030'],
	'20': ['015', '005', '010', '020'],
	'30': ['325', '395', '345', '205', '360', '510', '258', '215', '320', '225', '385', '220', '450', '370', '462', '405', '410', '358', '495', '308', '245', '415', '520', '350', '246']};
const agesByDiv = {'10': ['02', '07', '08', '10', '40'], '20': ['10', '20', '30', '40'], '30': ['02', '07', '10', '20', '30']};

// Primary Filter Types
const ageCodes = [ '10', '20', '30', '40', '02', '07', '08'];
const coreFocusCodes = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2012', '2013', '2015', '2016', '2022', '2024'];
const genderCodes = [ '01', '02' ];
const divisionCodes = [ '10', '20', '30' ];

// Additional Filter Types
const merchlassificationAPIds = [24, 23, 22, 2, 5, 4, 14, 13, 18, 17];
const merchlassificationEQIds = [11, 6, 20, 21];
const platformCodes = [12, 10, 15, 20, 2, 27];
const marketingTypeCodes = [1, 2, 3, 4, 5, 6, 7, 31, 35];

// Common Obscure Filter Types
const accountCode = ['84', '61', '83', '102', '104', '290'];
const businessOrganizationCode = ['000178', '000197', '000198', '000207', '000045'];
const carryOver = [0, 1];
const consumerFocusId = [28, 44, 169, 32, 12, 6, 5, 32, 13, 168, 42];
const consumerGroupId = [1, 2, 4, 20, 5, 21, 22];
const consumerPurposeId = [71, 16, 3, 888, 17, 87, 92, 93];
const channelSegmentationIdList = [30, 113, 114, 19, 16, 27, 25, 29, 83, 73, 74, 75, 147, 150];
const marketingInitiativeIdList = [34, 550, 498, 549, 548, 612];
const merchForecastQuantityList = [1000, 2000, 3000, 4000, 5000, 10000, 20000];
const countryRestrictionIdList = [21, 23, 3, 7, 24, 20, 30, 27, 18, 19, 53, 26];

// Global Obscure Filter Types
const alwaysAvailable = [0, 1];
const categoryPlm = ['BTIERN', 'CYEMM','RSTEW3', 'KERICH', 'HMELHA', 'JSPEN1', 'DGOWEN', 'MSOUZA', 'JLEE41', 'KLEEPE',
	'CLOOKE', 'BLOECH', 'KGUILD', 'SSALLO', 'AWRISL', 'CCHIKE'];
const categorySummaryCode = ['1004', '1006', '1002', '1001', '1003', '1009', '1010', '1005', '1011', '1012', '1007'];
const channelSegmentationId = channelSegmentationIdList.slice();
const developmentTeamId = [212, 287, 217, 18, 213, 13, 12, 8, 17, 23, 289];
const fitCode = ['WF', 'GF', 'AS'];
const geoRestrictionId = regions.geography.slice();
const marketingInitiativeId = marketingInitiativeIdList.slice();
const initiatorId = [1, 23, 6, 21];
const leagueId = [1, 3, 14, 28, 27, 2];
// const licensed = []; // all null so far
const marketingName = ['AIR MAX', 'AIR FORCE', 'NIKE SFB', 'FORCE', 'AIR DIAMOND', 'MONARCH',
	'LUNCAR', 'VAPOR', 'VAPOR TECH', 'TEMPO', 'SF9 NFL'];
const modelGroupId = [184, 32, 6, 15, 13, 17, 59];
const modelGroupTypeId = [42, 2, 4, 5, 22];
const modelId = [104852, 104772, 104754, 104732, 104752, 104871, 104736, 104780, 110580,
	104765, 104767, 104864, 105880, 132830, 104863, 137502, 134492, 136028, 136056,
	104872, 103414, 113461, 115784, 104856];
const modelName = ['CORE', 'CREW', 'LMTD', 'HYPERSPEED', 'VAPOR', 'TEMPO', 'TANK', 'SHORT', 'JORDAN'];
const moStatus = [0, 1];
const productCategoryCode = ['000233', '000756', '000712', '000002', '000364', '000013',
	'000005', '000713', '000778', '000757', '000716', '000710', '000787', '000386', '000777'];
const productId = [2872635, 3416731, 3231456, 3317250];
const productSubCategoryCode = ['004383', '001517', '004325', '004382', '005032', '005049',
	'004339', '004249', '000161', '003079', '002730', '002195', '004246'];
const silhouetteCode = ['050', '055', '105', '075', '060', '110', '010', '090', '430', '080'];
const siloId = [509, 596, 351, 511, 1, 348, 488, 352];
const sportActivityCode = ['14', '45', '52', '02', '09', '13', '30', '28', '46', '15', '29'];
const sportLevelId = [1, 2, 3, 5, 6];
const styleNumber = ['AQ9954', '905723', '831559', '831558', '705187', 'PAC278', '705186',
	'919711', 'AR5331', '919789', '919700'];
const teamId = [4097, 4098, 4096, 4114, 394, 4094, 4099, 479, 4100, 4103, 480, 4104, 4107, 482];
const tierId = [7, 8, 9, 5, 3, 4];

// Geo Obscure Filter Types
const countryRestrictionId = countryRestrictionIdList.slice();
const geoChannelSegmentationId  = channelSegmentationIdList.slice();
const geoMarketingInitiativeId = marketingInitiativeIdList.slice();
const geoMerchForecastQuantity = merchForecastQuantityList.slice();
const gmoStatus = [0, 1];
const gpoStatus = [0, 1];

// Country Obscure Filter Types
const cmoStatus = [0, 1];
const countryChannelSegmentationId = channelSegmentationIdList.slice();
const countryMarketingInitiativeId = marketingInitiativeIdList.slice();
const countryMerchForecastQuantity = merchForecastQuantityList.slice();
const cpoStatus = [0, 1];

// Country List
const countryObscureList = {accountCode, businessOrganizationCode, carryOver, cmoStatus, consumerFocusId, consumerPurposeId, consumerGroupId, countryChannelSegmentationId,
	countryMarketingInitiativeId, countryMerchForecastQuantity,
	cpoStatus};

// Geo List
const geoObscureList = {accountCode, businessOrganizationCode, carryOver, consumerFocusId,
	consumerPurposeId, consumerGroupId, countryRestrictionId, geoChannelSegmentationId,
	geoMarketingInitiativeId, geoMerchForecastQuantity, gmoStatus,
	gpoStatus};

// Global List
const globalObscureList = {accountCode, alwaysAvailable, businessOrganizationCode, carryOver,
	categoryPlm, categorySummaryCode, channelSegmentationId, consumerFocusId,
	consumerGroupId: consumerGroupId, consumerPurposeId: consumerPurposeId,
	developmentTeamId, fitCode, geoRestrictionId, marketingInitiativeId, initiatorId,
	leagueId, marketingName, modelGroupId, modelGroupTypeId, modelId, modelName, moStatus,
	productCategoryCode, productId, productSubCategoryCode, silhouetteCode, siloId,
	sportActivityCode, sportLevelId, styleNumber, teamId, tierId};

const listsByLevel = {1: globalObscureList, 2: geoObscureList, 3: countryObscureList};

export const getRandomWeightedRegion = () => {
	return randomItemWeightedArray(
		{ weight: 40, array: regions.global },
		{ weight: 30, array: regions.geography },
		{ weight: 30, array: regions.country }
	);
};

export const getRandomFilters = (optimal = false, additionalFilters = false, obscureFiltersPercent = 10, levelId = 1) => {
	const responseObj = {};
	const filtersObj = {};
	let queryDescriptor = '';

	if(optimal){
		filtersObj.ageCode = randomItem(ageCodes);
		filtersObj.coreFocusCode = randomItem(coreFocusCodes);
		filtersObj.genderCode = randomItem(genderCodes);
		filtersObj.divisionCode = randomItem(divisionCodes);
	}
	else {
		filtersObj.ageCode = randomItems(ageCodes, 0);
		filtersObj.coreFocusCode = randomItems(coreFocusCodes, 0, 6);
		filtersObj.genderCode = randomItems(genderCodes, 0);
		filtersObj.divisionCode = randomItems(divisionCodes, 0, 2);
	}

	if(filtersObj.ageCode.length + filtersObj.coreFocusCode.length + filtersObj.genderCode.length + filtersObj.divisionCode.length > 0 ){
		queryDescriptor += 'Indexed';
	}
	else {
		queryDescriptor += 'Unindexed';
	}

	if(additionalFilters){
		// Add AP merch class if AP
		if(filtersObj.divisionCode.includes('10')) {
			filtersObj.merchClassificationId = randomItems(merchlassificationAPIds, 1);
		}

		// Add EQ merch class if EQ
		if (filtersObj.divisionCode.includes('30')) {
			filtersObj.merchClassificationId = randomItems(merchlassificationEQIds, 1);
		}

		// Add Platform param if FW
		if (filtersObj.divisionCode.includes('20')){
			filtersObj.platformId = randomItems(platformCodes, 1);
		}

		// 20% of the time add a fitCode parameter
		if(randomInt(0, 100) < 20){
			filtersObj.fitCode = randomItem(['AF', 'WF']);
		}

		// 60% of the time add a marketingTypeCode parameter
		if(randomInt(0, 100) < 60){
			let filterName;

			switch(levelId){
				case 1:
					filterName = 'marketingTypeId';
					break;
				case 2:
					filterName = 'geoMarketingTypeId';
					break;
				case 3:
					filterName = 'countryMarketingTypeId';
					break;
				default:
					break;
			}

			filtersObj[filterName] = randomItems(marketingTypeCodes, 1);
		}
	}

	if(randomInt(0, 100) < obscureFiltersPercent) {
		queryDescriptor += 'Obscure';
		assignObscureFilterType(filtersObj, listsByLevel[levelId]);
	}

	responseObj.filtersObj = filtersObj;
	responseObj.queryDescriptor = queryDescriptor;

	return responseObj;
};

const assignObscureFilterType = (filtersObj, filterTypeList) => {
	const randomFilterType = randomItem(Object.keys(filterTypeList));
	const randomValues = isSingleFilterType(randomFilterType) ?
		randomItem(filterTypeList[randomFilterType]) :
		randomItems(filterTypeList[randomFilterType], 1);

	filtersObj[randomFilterType] = randomValues;
};

const isSingleFilterType = (searchString) => {
	searchString = searchString.toLowerCase();

	return searchString.includes('status') || searchString.includes('carryover') ||
	searchString.includes('merchforecast') || searchString.includes('alwaysavailable') ||
	searchString.includes('name');
};

export const generateBaseExportQuery = (seasonCodes) => {
	const query = {};
	const filtersObj = getRandomFilters();

	const filters = {};

	if(filtersObj.divisionCode.length){
		filters.division = filtersObj.divisionCode;
	}

	if(filtersObj.ageCode.length){
		filters.age = filtersObj.ageCode;
	}

	if(filtersObj.genderCode.length){
		filters.gender = filtersObj.genderCode;
	}

	if(filtersObj.coreFocusCode.length){
		filters.coreFocus = filtersObj.coreFocusCode;
	}

	query.fileName = randomCharacters(15);
	query.regionId = getRandomWeightedRegion();
	query.seasonCode = randomItem(seasonCodes);
	query.sorting = [];
	query.filters = filters;
	query.pageSize = {
		'width': 1200,
		'height': 800
	};

	return query;
};

export const generateBasePlaceholderPost = () => {
	const query = {};

	// Required fields
	query.name = randomCharacters(15);
	query.divisionCode = randomItem(divisionCodes);
	query.genderCode = randomItem(genderCodes);
	query.silhouetteCode = randomItem(silhouetteCodesByDiv[query.divisionCode]);

	// Optional Fields
	query.description = randomCharacters(20);
	query.coreFocusCode = randomItem(coreFocusCodes);
	query.ageCode = randomItem(agesByDiv[query.divisionCode]);
	query.retail = randomInt(1, 100).toString();
	query.wholesale = 0; // not used in UI yet
	query.offerDate = ''; // not used in UI yet

	return query;
};

export const generateQuery = (optimal = false, additionalFilters = false, obscureFiltersPercent = 0, levelId = 1) => {
	const queryObj = getRandomFilters(optimal, additionalFilters, obscureFiltersPercent, levelId);
	const filtersObj = queryObj.filtersObj;
	const responseObj = {};

	responseObj.queryDescriptor = queryObj.queryDescriptor;

	const where = {};

	Object.keys(filtersObj).forEach((key) => {
		if(filtersObj[key].length || typeof filtersObj[key] === 'number'){
			if(Array.isArray(filtersObj[key])){
				where[key] = {in: filtersObj[key]};
			}
			else if(key.toLowerCase().includes('name')){
				where[key] = {like: filtersObj[key]};
			}
			else {
				where[key] = {eq: filtersObj[key]};
			}
		}
	});

	responseObj.where = where;

	return responseObj;
};
