import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/pages/dashboard/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Requirement } from "@/lib/types";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Requirement>[] = [
  {
    header: "Entity",
    accessorKey: "entity",
  },
  {
    header: "Compliance List",
    accessorKey: "complianceList",
  },
  {
    header: "Department",
    accessorKey: "department",
  },
  {
    header: "Frequency of Compliance",
    accessorKey: "frequencyOfCompliance",
  },
  {
    header: "Type of Compliance",
    accessorKey: "typeOfCompliance",
  },
  {
    accessorKey: "dateSubmitted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Submitted" />
    ),
  },
  {
    accessorKey: "expiration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expiration" />
    ),
  },
  {
    header: "Remaining Days",
    cell: ({ row }) => {
      const expiration = row.original.expiration;
      const calculateRemainingDays = (expiration: string) => {
        const currentDate = new Date();
        const expirationDate = new Date(expiration);
        const timeDiff = expirationDate.getTime() - currentDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
      };

      return calculateRemainingDays(expiration);
    },
  },
  {
    accessorKey: "renewal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Renewal" />
    ),
  },
  {
    header: "Person in Charge",
    accessorKey: "personInCharge",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <p
          className={cn(
            "p-2 px-4 uppercase rounded-full text-white bg-black text-center",
            status === "Pending" && "bg-yellow-500",
            status === "Active" && "bg-green-500",
            status === "Inactive" && "bg-red-500",
            status === "Expired" && "bg-red-500"
          )}
        >
          {status}
        </p>
      );
    },
  },
  {
    header: "Document Reference",
    accessorKey: "documentReference",
    cell: ({ row }) => {
      return (
        <Button asChild variant={"outline"}>
          <Link
            to={`/client/requirements/${row.original.id}`}
            className="flex items-center gap-2"
          >
            {row.original.documentReference}
          </Link>
        </Button>
      );
    },
  },
];
