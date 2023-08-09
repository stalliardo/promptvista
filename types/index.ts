export interface Profile {
    email: string;
    name: string;
    picture: string;
    username?: string;
    _id?: string;
}

export interface Post {
    prompt: string;
    tag: string;
    creator?: Profile
    _id?: string;
}

export interface FormProps {
    type: string;
    post: Post;
    setPost: (arg: Post) => void;
    submitting: boolean;
    handleSubmit: (arg: React.FormEvent<HTMLFormElement>) => void;
}

export interface PromptCardProps {
    post: Post;
    handleTagClick?: (tag: string) => void;
    handleEdit?: () => void;
    handleDelete?: () => void;
}

export interface ProfilePageProps {
    name: string;
    desc: string;
    data: Post[]; // <- TEST
    handleEdit: (post: Post) => void;
    handleDelete: (post: Post) => void;
}