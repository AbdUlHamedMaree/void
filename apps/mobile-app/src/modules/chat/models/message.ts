export type BaseMessageModel = {
  id: number;
  sender: string;
  senderPicture: string;
  sended: boolean;
};

export type TextMessageModel = BaseMessageModel & {
  type: 'text';
  content: string;
};

export type ImageMessageModel = BaseMessageModel & {
  type: 'image';
  attachment: string;
};

export type MessageModel = ImageMessageModel | TextMessageModel;
