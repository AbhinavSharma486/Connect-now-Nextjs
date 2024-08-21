'use client';
import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, Loader, SendHorizontal, ThumbsUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Textarea } from '../ui/textarea';
import EmojiPicker from './EmojiPicker';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessageAction } from '@/actions/message.actions';
import { useSelectedUser } from '@/store/useSelectedUser';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogTitle } from '../ui/dialog';
import Image from 'next/image';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { pusherClient } from '@/lib/pusher';
import { Message } from '@/db/dummy';

const ChatBottomBar = () => {

  const [message, setMessage] = useState('');
  const { selectedUser } = useSelectedUser();
  const { user: currentUser } = useKindeBrowserClient();
  const queryClient = useQueryClient();

  const [imgUrl, setImgUrl] = useState("");

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: sendMessageAction
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;

    sendMessage({ content: message, messageType: "text", receiverId: selectedUser?.id! });
    setMessage('');

  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }

    if (e.key == "Enter" && e.shiftKey) {
      e.preventDefault();
      setMessage(message + "\n");
    }
  };

  useEffect(() => {
    const channelName = `${currentUser?.id}__${selectedUser?.id}`.split("__").sort().join("__");
    const channel = pusherClient?.subscribe(channelName);

    const handleNewMessage = (data: { message: Message; }) => {
      queryClient.setQueryData(["messages", selectedUser?.id], (oldMessages: Message[]) => {
        return [...oldMessages, data.message];
      });
    };


    channel.bind("newMessage", handleNewMessage);

    return () => {
      channel.unbind("newMessage", handleNewMessage);
      pusherClient.unsubscribe(channelName);
    };

  }, [currentUser?.id, selectedUser?.id, queryClient]);


  return (
    <div className='p-2 flex justify-between w-full items-center gap-2'>
      {
        !message.trim() && (
          <CldUploadWidget
            signatureEndpoint={"/api/sign-cloudinary-params"}
            onSuccess={(result, { widget }) => {
              setImgUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);
              widget.close();
            }}
          >
            {({ open }) => {
              return <ImageIcon
                size={20}
                onClick={() => open()}
                className='cursor-pointer text-muted-foreground'
              />;
            }}
          </CldUploadWidget>
        )
      }

      <Dialog open={!!imgUrl}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <div className='flex justify-center items-center relative h-96 w-full mx-auto'>
            <Image src={imgUrl} alt='Image Preview' fill className='object-contain' />
          </div>

          <DialogFooter>
            <Button
              type='submit'
              onClick={() => {
                sendMessage({ content: imgUrl, messageType: "image", receiverId: selectedUser?.id! });
                setImgUrl("");
              }}
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <AnimatePresence>
        <motion.div
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.5 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
          className='w-full relative'
        >
          <Textarea
            autoComplete='off'
            placeholder='write anyting here.....'
            rows={1}
            className='w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background min-h-0'
            value={message}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="absolute right-2 bottom-0.5">
            <EmojiPicker
              onChange={(emoji) => {
                setMessage(message + emoji);
              }}
            />
          </div>
        </motion.div>

        {
          message.trim() ? (
            <Button
              className='h-9 w-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0'
              variant={"ghost"}
              size={"icon"}
              onClick={handleSendMessage}
            >
              <SendHorizontal size={20} className='text-muted-foreground' />
            </Button>
          ) : (
            <Button
              className='h-9 w-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0'
              variant={"ghost"}
              size={"icon"}
            >
              {!isPending && <ThumbsUp size={20} className='text-muted-foreground'
                onClick={() => {
                  sendMessage({ content: "👍", messageType: "text", receiverId: selectedUser?.id! });
                }
                } />}
              {isPending && <Loader size={20} className='animate-spin' />}
            </Button>
          )
        }

      </AnimatePresence>
    </div>
  );
};

export default ChatBottomBar;