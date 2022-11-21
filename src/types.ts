export interface postType {id:number,title:string,body:string}
export type SliceState = {
    posts: postType[];
    favouritePosts: postType[];
    postToEdit: postType | null;
    open: boolean;
    postDetails: postType;
    showDetails: boolean;
  };
