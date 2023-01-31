const getFixPDPAction = (data) => [
    {
        data,
        type: "modify",
        path: "{{projectPath}}/frontend/frontastic/tastics/products/details/index.tsx",
        pattern: /] as/mg,
        template: '].filter((item) => item) as'
    },
]

export default getFixPDPAction;
