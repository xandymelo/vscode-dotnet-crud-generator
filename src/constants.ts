export enum workSpaceStateNames {
    generateService = 'generateService',
    generateModels = 'generateModels',
    generateController = 'generateController'
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
export const defaultControllerContent = `namespace YourNamespace
{
    public class YourClass
    {
    }
}`;