import {useState, FC} from "react";
import {Card, CardHeader, Button, Avatar, CardBody, CardFooter} from "@nextui-org/react";
import {clsx} from "@nextui-org/shared-utils";

interface UserTwitterCardProps {
  className?: string;
}

export const UserTwitterCard: FC<UserTwitterCardProps> = ({className}) => {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <Card className={clsx("max-w-[300px]", className)}>
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-sm font-semibold leading-none text-neutral-600">Zoey Lang</h4>
            <h5 className="text-sm tracking-tight text-neutral-400">@zoeylang</h5>
          </div>
        </div>
        <Button
          className={isFollowed ? "bg-transparent text-foreground border-neutral-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-sm pl-px text-neutral-400">
          Full-stack developer, @getnextui lover she/her&nbsp;
          <span aria-label="confetti" role="img">
            🎉
          </span>
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-neutral-400 text-sm">4</p>
          <p className=" text-neutral-400 text-sm">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-neutral-400 text-sm">97.1K</p>
          <p className="text-neutral-400 text-sm">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
};
