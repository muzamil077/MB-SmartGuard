// UI Component Types
interface BaseComponentProps {
    className?: ClassNames;
}

interface DeviceInfo {
    name: string;
    email: string;
    id: string;
    phone: string;
    pin: string;
    device_type: string;
    is_pro: boolean;
    notes: string;
    security_email: string;
    account?: string;
    device_info?: string;
    status?: {
        accesibility: boolean;
        device_admin: boolean;
        device_owner: boolean;
        draw_permission: boolean;
        last_extension_sync: string;
        last_sync: string;
        protection: boolean;
        vpn_on: boolean;
    };
}

export {
    BaseComponentProps,
    DeviceInfo
}