import { UserStatusType } from "@/domain/user/entities/types";
import { CircleIcon } from "lucide-react";

export function Badge({ status }: { status: UserStatusType }) {

    if (status === 'online') {
        return (
            <>
                <span className="inline-flex items-center rounded-md
                    bg-green-50 p-0 pl-1 pr-2 text-xs font-medium
                    text-green-700 ring-1 ring-inset ring-green-600/20 
                    cursor-default -ml-10 mt-1">
                        <CircleIcon fill="green" className="w-4 mr-1"/> Online
                </span>
            </>
        )
    }

    if (status === 'busy') {
        return (
            <>
                <span className="inline-flex items-center rounded-md
                    bg-red-50 p-0 pl-1 pr-2 text-xs font-medium
                    text-red-700 ring-1 ring-inset ring-red-600/20 
                    cursor-default -ml-10 mt-1">
                        <CircleIcon fill="red" className="w-4 mr-1"/> Ocupado
                </span>
            </>
        )
    }

    if (status === 'away') {
        return (
            <>
                <span className="inline-flex items-center rounded-md
                    bg-yellow-50 p-0 pl-1 pr-2 text-xs font-medium
                    text-yellow-700 ring-1 ring-inset ring-yellow-600/20 
                    cursor-default -ml-10 mt-1">
                        <CircleIcon fill="yellow" className="w-4 mr-1"/> Ausente
                </span>
            </>
        )
    }

    return (
        <>
            <span className="inline-flex items-center rounded-md
                bg-gray-50 p-0 pl-1 pr-2 text-xs font-medium
                text-gray-700 ring-1 ring-inset ring-gray-600/20 
                cursor-default -ml-10 mt-1">
                    <CircleIcon fill="gray" className="w-4 mr-1"/> Offline
            </span>
        </>
    )

}