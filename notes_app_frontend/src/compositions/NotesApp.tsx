import React from "react";
import { AbsoluteFill } from "remotion";
import { theme } from "../theme";
import { Header } from "../components/Header";
import { Sidebar, NoteListItem } from "../components/Sidebar";
import { NoteEditor, NoteModel } from "../components/NoteEditor";
import { VideoPanel, VideoNote } from "../components/VideoPanel";

// PUBLIC_INTERFACE
export const NotesApp: React.FC = () => {
  // Mock state for a lightweight demo without backend.
  const [notes, setNotes] = React.useState<NoteListItem[]>([
    {
      id: "n1",
      title: "Meeting Takeaways",
      preview: "Key decisions and TODOs...",
      updatedAt: "2h ago",
      pinned: true,
    },
    {
      id: "n2",
      title: "Research: Remotion + Notes",
      preview: "Ideas to combine timecodes with content...",
      updatedAt: "1d ago",
    },
    {
      id: "n3",
      title: "Personal Journal",
      preview: "Thoughts about the project direction...",
      updatedAt: "3d ago",
    },
  ]);
  const [selectedId, setSelectedId] = React.useState<string>("n2");

  const selected = notes.find((n) => n.id === selectedId) ?? null;

  const [noteDetail, setNoteDetail] = React.useState<NoteModel | null>({
    id: "n2",
    title: "Research: Remotion + Notes",
    content:
      "- Explore syncing text highlights with video timecodes.\n- Build smooth, modern UI (Ocean Professional).\n- Add shortcuts for adding timecode notes.\n\n#ideas #video #ux",
    updatedAt: new Date().toLocaleString(),
  });

  const [videoNotes, setVideoNotes] = React.useState<VideoNote[]>([
    { id: "v1", time: 12, text: "Intro starts, mention goal." },
    { id: "v2", time: 45, text: "Show how timecodes link to text." },
    { id: "v3", time: 88, text: "Summarize next steps." },
  ]);

  const handleCreate = () => {
    const id = `n${Date.now()}`;
    const newItem: NoteListItem = {
      id,
      title: "Untitled Note",
      preview: "Start typing to add content...",
      updatedAt: "Just now",
    };
    setNotes((prev) => [newItem, ...prev]);
    setSelectedId(id);
    setNoteDetail({
      id,
      title: "Untitled Note",
      content: "",
      updatedAt: new Date().toLocaleString(),
    });
  };

  const handlePinToggle = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
    );
  };

  const handleSave = (n: NoteModel) => {
    setNotes((prev) =>
      prev.map((it) =>
        it.id === n.id
          ? {
              ...it,
              title: n.title || "Untitled Note",
              preview:
                n.content.split("\n").find((l) => l.trim().length > 0) ??
                "No preview available",
              updatedAt: "Just now",
            }
          : it,
      ),
    );
    setNoteDetail({ ...n, updatedAt: new Date().toLocaleString() });
  };

  const handleDelete = (id: string) => {
    const filtered = notes.filter((n) => n.id !== id);
    setNotes(filtered);
    if (filtered.length) {
      setSelectedId(filtered[0].id);
      setNoteDetail({
        id: filtered[0].id,
        title: filtered[0].title,
        content: "",
        updatedAt: new Date().toLocaleString(),
      });
    } else {
      setSelectedId("");
      setNoteDetail(null);
    }
  };

  const handleAddTimecodeNote = (t: number) => {
    const id = `vt${Date.now()}`;
    setVideoNotes((prev) => [
      ...prev,
      { id, time: t, text: `New timecode at ${t}s` },
    ]);
  };

  return (
    <AbsoluteFill
      style={{
        background: theme.gradients.subtle,
        color: theme.colors.text,
        padding: 12,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          gap: 12,
        }}
      >
        <Header
          userName="Alex"
          onNewNote={handleCreate}
          onSearch={(q) => {
            // Simple local filter or highlight, no-op for demo
            void q;
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr 440px",
            gap: 12,
            height: "100%",
            minHeight: 0,
          }}
        >
          <div
            style={{
              borderRadius: theme.radii.lg,
              overflow: "hidden",
              background: theme.colors.surface,
              boxShadow: theme.shadows.md,
            }}
          >
            <Sidebar
              notes={notes}
              selectedId={selected?.id}
              onSelect={(id) => {
                setSelectedId(id);
                const found = notes.find((n) => n.id === id);
                setNoteDetail(
                  found
                    ? {
                        id: found.id,
                        title: found.title,
                        content: "",
                        updatedAt: new Date().toLocaleString(),
                      }
                    : null,
                );
              }}
              onCreate={handleCreate}
              onPinToggle={handlePinToggle}
            />
          </div>

          <div
            style={{
              borderRadius: theme.radii.lg,
              overflow: "hidden",
              background: theme.colors.surface,
              boxShadow: theme.shadows.md,
              minHeight: 0,
            }}
          >
            <NoteEditor
              note={noteDetail}
              onChange={setNoteDetail as (n: NoteModel) => void}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          </div>

          <div
            style={{
              borderRadius: theme.radii.lg,
              overflow: "hidden",
              background: theme.colors.surface,
              boxShadow: theme.shadows.md,
              minHeight: 0,
            }}
          >
            <VideoPanel
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              poster=""
              notes={videoNotes}
              onSeek={() => undefined}
              onAddNote={handleAddTimecodeNote}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
