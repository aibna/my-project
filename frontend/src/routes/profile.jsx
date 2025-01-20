import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-lg mx-auto">
      <Card className="bg-white shadow-lg rounded-lg">
        <CardHeader className="flex items-center space-x-4">
          <Avatar>
            {/* Avatar */}
            <AvatarImage alt={user?.user_metadata?.email} />
            <AvatarFallback>
              {user?.user_metadata?.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardDescription>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-center">
              {user?.user_metadata?.full_name}
            </h2>
            <p className="text-red-500 text-center">
              {user?.user_metadata?.role}
            </p>
          </div>
        </CardDescription>
      </Card>
    </div>
  );
};

export default ProfilePage;
