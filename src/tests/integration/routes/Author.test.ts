import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../server'; // Import your server file
import Author from '../../../models/Author';
import http from 'http';

describe('Author API', () => {
    let server: any;
    beforeAll(() => {
        server = http.createServer(app);
        server.listen();
    });

    afterAll((done) => {
        server.close(done);
    });

    afterEach(async () => {
        await Author.deleteMany();
    });

    test('should create a new author', async () => {
        const response = await request(app)
            .post('/authors/create')
            .send({ name: 'Test Author' });

        expect(response.status).toBe(200);
        expect(response.body.author).toHaveProperty('_id');
        expect(response.body.author.name).toBe('Test Author');
    });

    test('should get an author by ID', async () => {
        const author = new Author({ name: 'Existing Author' });
        await author.save();

        const response = await request(app)
            .get(`/authors/get/${author._id}`);

        expect(response.status).toBe(200);
        expect(response.body.author.name).toBe('Existing Author');
    });

    test('should get all authors', async () => {
        const author1 = new Author({ name: 'Author One' });
        const author2 = new Author({ name: 'Author Two' });
        await author1.save();
        await author2.save();

        const response = await request(app)
            .get('/authors/allauthor');

        expect(response.status).toBe(200);
        expect(response.body.authors.length).toBe(2);
        expect(response.body.authors[0].name).toBe('Author One');
        expect(response.body.authors[1].name).toBe('Author Two');
    });

    test('should update an author by ID', async () => {
        const author = new Author({ name: 'Author to Update' });
        await author.save();

        const response = await request(app)
            .patch(`/authors/update/${author._id}`)
            .send({ name: 'Updated Author' });

        expect(response.status).toBe(200);
        expect(response.body.author.name).toBe('Updated Author');
    });

    test('should delete an author by ID', async () => {
        const author = new Author({ name: 'Author to Delete' });
        await author.save();

        const response = await request(app)
            .delete(`/authors/delete/${author._id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('this data is deleted');
    });
});
