/**
 * Device Services Module
 * This module exports all device-related API services for fetching device information,
 * status, payment details, and updating device information.
 */

// Device Info Services
export { default as fetchDeviceInfo } from './info/get-device';
export { default as fetchDeviceStatus } from './info/get-device-status';
export { default as updateDeviceInfo } from './info/update-device';

// Payment Services
export { default as fetchDevicePaymentInfo } from './payment/get-payment';
export { default as updateCancelPayment } from './payment/update-cancel-payment';

// Categories Services
export { default as getDeviceCategories } from './categories/get-categories';

// Device List Services
export { default as fetchDeviceList } from './devices/get-list-devices';
export { default as fetchDevicesdata } from './devices/get-devices';
export { default as createDevice } from './devices/create-device';

// Device URLs Services
export { default as fetchDevicesUrls } from './urls/get-devices-urls';
export { default as fetchDevicesUrlsLogs } from './urls/get-devices-urls-logs';
export { default as updateDeviceUrl } from './urls/update-device-url';

// Device Apps Services
export { default as fetchDevicesApps } from './appsInfo/get-devices-apps';

// Device Enrollment Lock Services
export { default as getEnrollmentLock } from './info/get-enrollment-lock';
export { default as updateEnrollmentLock } from './info/update-enrollment-lock';

// Device Settings Services
export { default as fetchDeviceSettingsFeatures } from './settings/get-device-settings-features';
export { default as updateDeviceSettingsFeatures } from './settings/update-device-settings-features';
export { default as fetchDeviceSettingsConfigkey } from './settings/get-device-settings-configkey';
export { default as fetchDeviceSettings } from './settings/get-device-settings';
export { default as updateDeviceSettings } from './settings/update-device-settings';
export { default as fetchDeviceSettingsConfigs } from './settings/get-device-settings-configs';
export { default as updateDeviceSettingsConfigs } from './settings/update-device-settings-configs';

// Device Extension Services
export { default as fetchDeviceExtension } from './extension/get-device-extension';
export { default as updateDeviceExtension } from './extension/update-device-extension';

// Device Commands Services
export { default as disableCodeGeneration } from './commands/update-code-generation';
export { default as updateDisableTemporary } from './commands/update-disablee-temporary';

// Device Requests and Restrictions Services
export { default as updateDeviceRequests } from './categories/update-request-category';
export { default as fetchDeviceRestrictions } from './restrictions/get-device-restrictions';
export { default as updateDeviceRestrictions } from './restrictions/update-device-restrictions';

// Admin Services
export { default as fetchAdminConfig } from './admin-config/get-admin-config';
export { default as fetchAdminPassword } from './admin-password/get-admin-password';
