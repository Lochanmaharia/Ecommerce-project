"use client";

import { client, notify } from "@/utils/helper";
import { useRouter } from "next/navigation";

function StatusBtn({ value, id, field, module }) {
    const router = useRouter();

    async function StatusHandler() {
        try {
            const response = await client.patch(`${module}/status-update/${id}`, //  dynamic API
                { field }
            );

            notify(response.data.message, response.data.success);

            if (response.data.success) {
                router.refresh();
            }

        } catch (error) {
            const message =
                error?.response?.data?.message || "Internal Server Error";
            notify(message, false);
        }
    }

    const label = {
        status: ["Active", "Inactive"],
        is_home: ["Home", "Not Home"],
        is_top: ["Top", "Not Top"],
        is_popular: ["Popular", "Not Popular"],
    };

    
    const [TrueLabel, FalseLabel] = label[field] || ["YES", "NO"];

    const base = "px-3 py-1 rounded-full text-xs font-medium";

    return (
        <button
            onClick={StatusHandler}
            className={`${base} ${
                value
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
            }`}
        >
            {value ? TrueLabel : FalseLabel}
        </button>
    );
}

export default StatusBtn;