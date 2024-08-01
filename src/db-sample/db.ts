interface Customer {
    id: number;
    points: number;
}

export const getCustomerSync = (id: number): Customer => {
    console.log("Reading a customer from MongoDB...");
    return { id: id, points: 10 }
}

export const getCustomer = async (id: string): Promise<{ id: string, points: number }> => {
    return new Promise((resolve, reject) => {
        console.log("Reading a customer from MongoDB...");
        resolve({ id, points: 10 });
    });
}