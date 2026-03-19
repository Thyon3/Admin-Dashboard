import Avatar from "@/components/ui/avatar/Avatar";
import AvatarText from "@/components/ui/avatar/AvatarText";

export default function AvatarsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Avatars
      </h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Image Avatars
          </h2>
          <div className="flex gap-4 items-center">
            <Avatar src="/images/user/user-01.jpg" size="xsmall" />
            <Avatar src="/images/user/user-02.jpg" size="small" />
            <Avatar src="/images/user/user-03.jpg" size="medium" />
            <Avatar src="/images/user/user-04.jpg" size="large" />
            <Avatar src="/images/user/user-05.jpg" size="xlarge" />
            <Avatar src="/images/user/user-06.jpg" size="xxlarge" />
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Avatar with Status
          </h2>
          <div className="flex gap-4 items-center">
            <Avatar src="/images/user/user-07.jpg" status="online" />
            <Avatar src="/images/user/user-08.jpg" status="offline" />
            <Avatar src="/images/user/user-09.jpg" status="busy" />
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Text Avatars
          </h2>
          <div className="flex gap-4 items-center">
            <AvatarText name="John Doe" />
            <AvatarText name="Jane Smith" />
            <AvatarText name="Bob Johnson" />
            <AvatarText name="Alice Brown" />
          </div>
        </div>
      </div>
    </div>
  );
}
