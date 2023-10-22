import React from "react";
import { Alert, Button, Input, InputRef, Table, Typography } from "antd";

import { cloneDeep, intersection } from "lodash";
import { ICustomer } from "../dto/customer";
import { getCustomers } from "../api-client/main-page-client";

import "./main-page.css";

const { Search } = Input;
const MAX_ROW = 3;
const INTERVAL_MILLISECONDS = 60000;

export const MainPage = (): JSX.Element => {
  return (
    <div>
      <CustomerTable />
    </div>
  );
};

const CustomerTable = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dataSource, setDataSource] = React.useState<ICustomer[]>([]);

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [filteredSource, setFilteredSource] = React.useState<ICustomer[]>([]);

  const [page, setPage] = React.useState<number>(1);
  const [hasNext, setHasNext] = React.useState<boolean>(true);

  const fetchData = () => {
    try {
      setLoading(true);
      const data = getCustomers(page, MAX_ROW);
      setDataSource((preState) => {
        const existedValue = intersection(preState, data.customers);
        if (preState.length === 0 || existedValue.length === 0) {
          return [...preState, ...data.customers];
        }
        return preState;
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    try {
      const data = getCustomers(page + 1, MAX_ROW);
      setDataSource((preState) => [...preState, ...data.customers]);
      setPage((preState) => preState + 1);
      setHasNext(data.pagination.next_page != null);
    } catch (error) {
      const errorMessage = (error as Error).message;
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, INTERVAL_MILLISECONDS);
    return () => clearInterval(id);
  }, []);

  const columns = [
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
      sorter: (a: ICustomer, b: ICustomer) => a?.email?.localeCompare(b?.email),
    },
    {
      key: "userName",
      dataIndex: "username",
      title: "User Name",
      sorter: (a: ICustomer, b: ICustomer) =>
        a?.username?.localeCompare(b?.username),
    },
    {
      key: "dob",
      dataIndex: "profile",
      title: "Date of birth",
      render: (_: any, record: ICustomer) => record.profile.dob,
    },
    {
      key: "address",
      dataIndex: "profile",
      title: "Address",
      render: (_: any, record: ICustomer) => record.profile.address,
    },
    {
      key: "company",
      dataIndex: "profile",
      title: "Company",
      render: (_: any, record: ICustomer) => record.profile.company,
    },
    {
      key: "about",
      dataIndex: "profile",
      title: "About",
      render: (_: any, record: ICustomer) => record.profile.about,
    },
  ];

  return (
    <div>
      {errorMessage && <Alert type="error" message={errorMessage} />}
      <Typography.Title level={3}>Customers</Typography.Title>
      <div className={"tableAddon"}>
        <Search
          addonBefore="Search email"
          allowClear={true}
          onSearch={(value, _e, info) => {
            const filteredDataSource = cloneDeep(dataSource).filter(
              (customer) => customer.email.toLowerCase().includes(value)
            );
            setFilteredSource(filteredDataSource);
          }}
          onChange={(e) => {
            if (e.target.value === "") {
              setFilteredSource([]);
            }
          }}
        />
        <Button type="default" onClick={loadMore} disabled={!hasNext}>
          Load more
        </Button>
      </div>
      <Table
        columns={columns}
        loading={loading}
        rowKey={"id"}
        dataSource={
          !filteredSource || filteredSource.length > 0
            ? filteredSource
            : dataSource
        }
        pagination={{
          defaultPageSize: MAX_ROW,
          hideOnSinglePage: true,
          responsive: true,
        }}
      />
    </div>
  );
};
