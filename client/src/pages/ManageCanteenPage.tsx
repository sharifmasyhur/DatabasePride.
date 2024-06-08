import {
  useCreateMyCanteen,
  useGetMyCanteen,
  useGetMyCanteenOrders,
  useUpdateMyCanteen,
} from "@/api/MyCanteenApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageCanteenForm from "@/forms/manage-canteen-form/ManageCanteenForm";

const ManageCanteenPage = () => {
  const { createCanteen, isLoading: isCreateLoading } =
    useCreateMyCanteen();
  const { canteen } = useGetMyCanteen();
  const { updateCanteen, isLoading: isUpdateLoading } =
    useUpdateMyCanteen();

  const { orders } = useGetMyCanteenOrders();

  const isEditing = !!canteen;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-canteen">Manage Canteen</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-canteen">
        <ManageCanteenForm
          canteen={canteen}
          onSave={isEditing ? updateCanteen : createCanteen}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageCanteenPage;
