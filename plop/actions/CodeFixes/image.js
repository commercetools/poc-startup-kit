const getFixImageAction = (data) => [
    {
        data,
        type: "modify",
        path: "{{projectPath}}/frontend/frontastic/lib/image/index.tsx",
        pattern: "let media: MediaItem;",
        template: `
        if (!mediaProp) {
            return null;
          }
          let media: MediaItem;
        `,
    },
]

export default getFixImageAction;
