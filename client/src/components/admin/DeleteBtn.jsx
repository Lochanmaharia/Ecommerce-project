"use client";

import { client, notify } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

function DeleteBtn({ module, id }) {
    const router = useRouter();

    async function DeleteHandler() {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (!result.isConfirmed) return;

        try {
            const response = await client.delete(
                `${module}/delete/${id}` //  dynamic API
            );

            notify(response.data.message, response.data.success);

            if (response.data.success) {
                Swal.fire("Deleted!", "Your data has been deleted.", "success");
                router.refresh();
            }

        } catch (error) {
            const message =
                error?.response?.data?.message || "Internal Server Error";
            notify(message, false);
        }
    }

    return (
        <button
            onClick={DeleteHandler}
            className="bg-red-100 p-2.5 rounded-xl text-red-600 hover:bg-red-200 hover:scale-110 transition duration-200 shadow-sm"
        >
            <FiTrash2 size={16} />
        </button>
    );
}

export default DeleteBtn;