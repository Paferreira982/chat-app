import { UserStatusType, UserStatusPtBrType } from "@/types/user.types";

export function UserStatus({ status }: { status: UserStatusType }) {

    const baseClass = "";

    if (status === 'online') {
        return (
            <>
                <div className={`${baseClass} text-green-500`}>{UserStatusPtBrType[status]}</div>
            </>
        )
    }

    if (status === 'busy') {
        return (
            <>
                <div className={`${baseClass} text-red-500`}>{UserStatusPtBrType[status]}</div>
            </>
        )
    }

    if (status === 'away') {
        return (
            <>
                <div className={`${baseClass} text-yellow-500`}>{UserStatusPtBrType[status]}</div>
            </>
        )
    }

    return (
        <>
            <div className={`${baseClass} text-gray-500`}>{UserStatusPtBrType[status]}</div>
        </>
    )

}