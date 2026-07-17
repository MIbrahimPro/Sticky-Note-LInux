
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<h2>Sticky Canvas</h2><p>Start typing your markdown notes here...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-invert focus:outline-none max-w-none',
      },
    },
  });

  return (
    <div className="flex-1 w-full text-white/90">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
