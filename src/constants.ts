export enum workSpaceStateNames {
    generateService = 'generateService',
    generateModels = 'generateModels'
}

export const defaultModelContent = `namespace YourNamespace
        {
            public class YourClass
            {
            }
        }`;

export const defaultServiceContent = `namespace YourNamespace
{
    public class YourClass
    {
    }
}`;