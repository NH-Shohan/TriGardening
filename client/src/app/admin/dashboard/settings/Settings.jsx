import Category from "@/components/settings/Category";
import Password from "@/components/settings/Password";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <div className="flex flex-col gap-10 h-full max-w-5xl">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 justify-between">
        <div>
          <h4>Change Password</h4>
          <small className="text-neutral-400">
            You can only change your password once every 24 hours
          </small>
        </div>
        <Password />
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-between">
        <div>
          <h4>Add Category</h4>
          <small className="text-neutral-400">
            Add a new category to the system
          </small>
        </div>
        <Category />
      </div>
    </div>
  );
};

export default Settings;
