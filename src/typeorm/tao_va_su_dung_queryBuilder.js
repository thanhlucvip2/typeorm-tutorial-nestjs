('************************* sử dụng DataSource để createQueryBuilder ***************************** ');

const DataSource = await this.bankRepository
  .createQueryBuilder()
  .select('test') // lấy cả table
  .from(BankEntity, 'test')
  .where('test.client_id = :id', {
    id: 'e3f82ef3-75ff-4485-ba13-8089d2d5000c',
  })
  .getMany(); // lấy nhiều data
// lấy 1 data dùng : getOne()

/** Query : 
SELECT
    test.client_id,
    test.id,
    test.name_bank,
    test.address_bank
from bank as test
WHERE test.client_id = 'e3f82ef3-75ff-4485-ba13-8089d2d5000c'
*/
('************************* sử dụng manager để createQueryBuilder ***************************** ');

// sử dụng manager
const manager = await this.bankRepository.manager
  .createQueryBuilder(BankEntity, 'test')
  .where('test.client_id = :id', {
    id: 'e3f82ef3-75ff-4485-ba13-8089d2d5000c',
  })
  .getMany(); // lấy nhiều data
// lấy 1 data dùng : getOne()

/** Query : 
SELECT
    test.client_id,
    test.id,
    test.name_bank,
    test.address_bank
from bank as test
WHERE test.client_id = 'e3f82ef3-75ff-4485-ba13-8089d2d5000c'
*/

('************************* insert values ***************************** ');

// insert values
const insert_into = await this.bankRepository
  .createQueryBuilder()
  .insert()
  .into(BankEntity)
  .values([
    {
      client_id: '35f5b12f-7145-420f-893d-5982aae999d2',
      address_bank: 'test111',
      name_bank: 'doan thanhluc',
    },
  ])
  .execute();
// query :
// INSERT INTO
//     bank (
//         name_bank,
//         address_bank,
//         client_id
//     )
// VALUES (
//         'doan thanhdasdluc',
//         'test1adasd11',
//         '35f5b12f-7145-420f-893d-5982aae999d2'
//     )
('************************* update ***************************** ');

// update value
const update_value = await this.bankRepository
  .createQueryBuilder()
  .update(BankEntity)
  .set({
    name_bank: 'update doanthanhluc 2',
    address_bank: 'update address 2',
  })
  .where('id = :id', { id: 'fef53533-7025-4556-b5d8-5db1112c17c7' })
  .execute();
// query :
/**
  UPDATE bank
  SET
    name_bank = 'doanthanhlu 3',
    address_bank = 'update 3'
  where id = '367d8dfe-184c-4a84-9cf0-655a594067a0'
*/

('************************* delete ***************************** ');

// delete
const deleteValue = await this.bankRepository
  .createQueryBuilder()
  .delete()
  .from(BankEntity)
  .where('id = :id', { id: '367d8dfe-184c-4a84-9cf0-655a594067a0' })
  .execute();
// Query :
/**
  DELETE FROM bank
  WHERE bank.id = 'bc2ac7c7-516a-44d0-95d7-f0d106237d4b'
 */

('************************* data từ queryBuilder***************************** ');

// lấy data từ queryBuilder
const testQuery = {
  getMany: 'Lấy tất cả data',
  getOne: ' Lấy 1 data đứng đầu( nên kết hợp với where)',
  getOneOrFail:
    'trả về  EntityNotFoundError nếu không tìm thấy data' /** { "statusCode": 500,"message": "Internal server error"}*/,
  getManyAndCount: 'Lấy tất cả data kèm theo tổng số lượng data',
  getSql: 'in ra câu lệnh sql',
  getQuery: 'in ra câu lệnh sql',
  getRawMany:
    'trả về 1 giá trị, kiểu dự liệu kèm theo tên Entity_<tên cột trong bảng>',
  getRawOne:
    'trả về all giá trị kiểu dự liệu kèm theo tên Entity_<tên cột trong bảng>',
  // ví dụ: {
  //     "BankEntity_id": "d7613c3a-d017-4084-836c-cca13e0cf1a8",
  //     "BankEntity_name_bank": "test",
  //     "BankEntity_address_bank": "testese",
  //     "BankEntity_client_id": "2f996d6c-6c39-4420-a111-17187f088559"
  // },
  getParameters: 'lấy tham số được truyền vào',
  // ví dụ : ...  .where('bank.address_bank = :id', { id: 'testese' }).getParameters() // sẽ lấy ra  { id: 'testese' }
};
const getMany = await this.bankRepository.createQueryBuilder().getMany(); // Lấy tất cả data
const getOne = await this.bankRepository.createQueryBuilder().getOne(); // Lấy 1 data đứng đầu( nên kết hợp với where)
const getMany_kethop_OR_AND = await this.bankRepository
  .createQueryBuilder()
  .where('client_id = :client_id OR name_bank = :name_bank', {
    client_id: '2f996d6c-6c39-4420-a111-17187f088559',
    name_bank: 'update doanthanhluc',
  })
  .getMany(); // Lấy 1 data kết hợp OR AND
/**( query : 
      SELECT *
      from bank
      WHERE
          client_id = '2f996d6c-6c39-4420-a111-17187f088559'
          OR name_bank = 'update doanthanhluc'
) */

// getOneOrFail sẽ nhận được một kết quả duy nhất từ ​​cơ sở dữ liệu, nhưng nếu không có kết quả nào tồn tại, nó sẽ ném ra một EntityNotFoundError:
const getOneOrFail = await this.bankRepository
  .createQueryBuilder()
  .getOneOrFail(); // trả về nếu không tìm thấy data
/**
  {
    "statusCode": 500,
    "message": "Internal server error"
  }
   */
('************************* Sum data ***************************** ');

const { sum, total } = await this.emBi
  .createQueryBuilder(BankEntity, 'bank')
  .select('SUM(bank.price)', 'sum')
  .addSelect('COUNT(bank.price)', 'total')
  .getRawOne();
// lấy ra sum và total khi tính
//############ Lưu ý: Lúc này không thể dùng getOne() vì sẽ trả về null, nên dùng getRawOne

('************************* sum - groupBy : Sum dựa trên groupby ***************************** ');

// Sum dựa trên groupby
const result = await this.emBi
  .createQueryBuilder(BankEntity, 'bank')
  .select('bank.client_id')
  .addSelect('SUM(bank.price)', 'sum_price')
  .addSelect('SUM(bank.price1)', 'sum_price1')
  .groupBy('bank.client_id')
  .getRawMany();

// kết quả trả về tổng price của những client_id giống nhau
//   result = [
//   {
//     bank_client_id: null,
//     sum_price: '31231',
//     sum_price1: '1231',
//   },
//   {
//     bank_client_id: '2f996d6c-6c39-4420-a111-17187f088559',
//     sum_price: '2246',
//     sum_price1: '4354',
//   },
//   {
//     bank_client_id: '35f5b12f-7145-420f-893d-5982aae999d2',
//     sum_price: '747',
//     sum_price1: '312312',
//   },
// ];]

('************************* alilas : bí danh ***************************** ');

// ** bí danh
createQueryBuilder().select('test').from(BankEntity, 'test');
// bank là bí danh của BankEntity

//query : SELECT test.name_bank from bank as test

('************************* parameters : Truyền tham số ***************************** ');

// parameters : truyền tham số
// có 2 cách truyền
/**
 // cách 1 :
    .where("user.name = :name")
    .setParameter("name", "Timber") // Timber là tham số truyền vào, name là biến
  // cách 2 : truyền trực tiếp trong where
    .where("user.name = :name", { name: "Timber" })
 */
// In trong parameters

const parameters = `.where("user.name IN (:...names)", { names: [ "Timber", "Cristal", "Lina" ] })
câu query  : WHERE user.name IN ('Timber', 'Cristal', 'Lina')`;

const parameters_test = `
  .where('bank.name_bank IN (:...list_name_bank)', {
        list_name_bank: ['test', 'teste'],
      })
      .getMany();

  Query : 
      SELECT *
      from bank
      WHERE
          name_bank in (
              'test',
              'teste',
              'update doanthanhluc 2'
          )
`;

('************************* Where ***************************** ');
createQueryBuilder('user').where('user.name = :name', { name: 'Timber' });

const Query_where = ` 
           SELECT ... FROM users user WHERE user.name = 'Timber'
`;
('************************* Where - and ***************************** ');
// cách 1 :
createQueryBuilder(BankEntity, 'bank')
  .where('bank.client_id = :id AND bank.name_bank = :name', {
    id: '2f996d6c-6c39-4420-a111-17187f088559',
    name: 'test',
  })
  .getMany();

// cách 2 :
createQueryBuilder(BankEntity, 'bank')
  .where('bank.client_id = :id', {
    id: '2f996d6c-6c39-4420-a111-17187f088559',
  })
  .andWhere('bank.name_bank = :name', { name: 'test' })
  .getMany();

const Query_where_and = `SELECT *
FROM bank
WHERE
    client_id = '2f996d6c-6c39-4420-a111-17187f088559'
    AND name_bank = 'test'`;

('************************* Where - or ***************************** ');
// cách 1
createQueryBuilder(BankEntity, 'bank')
  .where('bank.client_id = :id', {
    id: '2f996d6c-6c39-4420-a111-17187f088559',
  })
  .orWhere('bank.name_bank = :name', { name: 'update doanthanhluc' })
  .getMany();

// cách 2
createQueryBuilder(BankEntity, 'bank')
  .where('bank.client_id = :id OR bank.name_bank = :name', {
    id: '2f996d6c-6c39-4420-a111-17187f088559',
    name: 'update doanthanhluc',
  })
  .getMany();

const Query_where_or = `SELECT *
  FROM bank
  WHERE
      client_id = '2f996d6c-6c39-4420-a111-17187f088559'
      OR name_bank = 'test'`;

('************************* Where - in ***************************** ');
createQueryBuilder(BankEntity, 'bank')
  .where('bank.name_bank IN (:...name_bank)', {
    name_bank: ['test', 'update doanthanhluc'],
  })
  .getMany();

const Query_where_in = `SELECT * FROM bank WHERE name_bank IN ('test','update doanthanhluc 2')`;

('************************* Where - sử dụng câu where phức tạp ***************************** ');
// No NOT
createQueryBuilder(BankEntity, 'bank')
  .where('bank.price = :price', { price: 1 })
  .andWhere(
    new Brackets((qb) => {
      qb.where('bank.name_bank = :name_bank', {
        name_bank: 'abc',
      }).orWhere('bank.address_bank = :address_bank', {
        address_bank: 'update address 2',
      });
    }),
  );

const Query_Where_Brackets = `
    SELECT *
    FROM bank
    WHERE
        price = 1
        and(
            name_bank = 'abc'
            OR address_bank = 'update address 2'
        )
`;
// Ngược lại IS NOT
createQueryBuilder(BankEntity, 'bank')
  .where('bank.price = :price', { price: 1 })
  .andWhere(
    new NotBrackets((qb) => {
      qb.where('bank.name_bank = :name_bank', {
        name_bank: 'abc',
      }).orWhere('bank.address_bank = :address_bank', {
        address_bank: 'update address 2',
      });
    }),
  );

const Query_Where_NotBrackets = `
    SELECT *
    FROM bank
    WHERE
        price = 1
        and NOT(
            name_bank = 'abc'
            OR address_bank = 'update address 2'
        )
`;
('************************* HAVING trong SQL ***************************** ');
/**
 * Mệnh đề HAVING trong SQL được sử dụng để lọc các bản ghi và chỉ lấy những bản ghi phù hợp với yêu cầu hoặc thực sự cần thiết tương tự như mệnh đề WHERE. Tuy nhiên:

WHERE là câu lệnh điều kiện trả kết quả đối chiếu với từng dòng.
HAVING là câu lệnh điều kiện trả kết quả đối chiếu cho nhóm được tạo bởi mệnh đề GROUP BY.

 --- Vì vậy mà sau GROUP BY thì sẽ chỉ dùng được HAVING còn WHERE không dùng được sau GROUP BY. ---
 Có thể là các hàm như SUM, COUNT, MIN, MAX hoặc AVG.
*/

// sử dụng having kết hợp SUM
createQueryBuilder(BankEntity, 'bank')
  .select('bank.name_bank')
  .addSelect('SUM(bank.price)', 'sum')
  .groupBy('bank.name_bank')
  .having('bank.name_bank in (:...listName)', {
    listName: ['test', 'teste'],
  })
  .getRawMany();

const Query_Having_SUM = `
      SELECT SUM(price), name_bank
      FROM bank
      GROUP BY (name_bank)
      HAVING
          name_bank in ('test', 'teste')
`;
// sử dụng having kết hợp Count
createQueryBuilder(BankEntity, 'bank')
  .select('bank.name_bank')
  .addSelect('COUNT(bank)', 'count')
  .groupBy('bank.name_bank')
  .having('bank.name_bank  = :name_bank', {
    name_bank: 'abc',
  })
  .getRawMany();

const Query_Having_COUNT = `
      SELECT Count(price), name_bank
      FROM bank
      GROUP BY (name_bank)
      HAVING
          name_bank in ('abc', 'teste')
`;

('************************* ORDER BY trong SQL ***************************** ');
// ASC
createQueryBuilder(BankEntity, 'bank')
  .orderBy({ 'bank.price': 'ASC' })
  .getMany();
const Query_order_by_ASC = `SELECT * FROM bank ORDER BY price ASC `;
// DESC
createQueryBuilder(BankEntity, 'bank')
  .orderBy({ 'bank.price': 'DESC' })
  .getMany();
const Query_order_by_DESC = `SELECT * FROM bank ORDER BY price DESC `;

// ORDER BY AND
createQueryBuilder(BankEntity, 'bank')
  .orderBy({ 'bank.price': 'ASC', 'bank.name_bank': 'ASC' })
  .getMany();
const Query_order_by_AND = `SELECT * FROM bank ORDER BY price ASC , name_bank ASC  `;

('************************* DISTINCT trong SQL - lọc trùng ***************************** ');
createQueryBuilder(BankEntity, 'bank').distinctOn(['bank.name_bank']).getMany();
('************************* LIMIT trong SQL - phân trang ***************************** ');
createQueryBuilder('user').limit(10);
('************************* SKIP trong SQL - phân trang ***************************** ');
createQueryBuilder(BankEntity, 'bank').skip(2).getMany();

('************************* innerJoinAndSelect ***************************** ');
('************************* leftJoinAndSelect  ***************************** ');
// join và select tất cả dữ liệu
('************************* leftJoin   ***************************** ');
('************************* innerJoin   ***************************** ');
// chỉ join và không select
