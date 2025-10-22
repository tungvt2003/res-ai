"use client";

import { useRouter } from "@/app/shares/locales/navigation";
import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  List,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaUser, FaSearch, FaMapMarkerAlt, FaEye } from "react-icons/fa";
import { useGetHospitalbySlugQuery } from "@/app/modules/hospital/hooks/queries/hospitals/use-get-hospital-by-slug.query";
import { Doctor } from "@/app/modules/hospital/types/doctor";

export default function BookingDoctorPage() {
  const router = useRouter();
  const params = useParams();
  const hospitalSlug = params.hospital as string;
  const { Title, Paragraph, Text } = Typography;
  const { Option } = Select;

  // Gọi API hospital + doctors
  const { data, isLoading } = useGetHospitalbySlugQuery(hospitalSlug, {
    enabled: !!hospitalSlug,
  });

  const hospital = data?.data;
  const doctors: Doctor[] = hospital?.Doctors || [];

  // State lọc
  const [nameFilter, setNameFilter] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  // Lọc theo input
  const filteredDoctors = doctors.filter((doc) => {
    let match = true;
    if (nameFilter && !doc.full_name.toLowerCase().includes(nameFilter.toLowerCase())) {
      match = false;
    }
    if (specialtyFilter && doc.specialty !== specialtyFilter) {
      match = false;
    }
    if (genderFilter && doc.image !== "" && genderFilter) {
      // giả sử backend sau có giới tính thì check, còn giờ bỏ qua
    }
    return match;
  });

  return (
    <section>
      <div style={{ padding: "24px" }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Chọn Bác Sĩ {hospital?.name}
        </Title>
        <Paragraph style={{ textAlign: "center" }} className="flex justify-center items-center">
          <FaMapMarkerAlt />
          <Text strong style={{ marginLeft: "8px" }}>
            {hospital?.address}, {hospital?.ward}, {hospital?.city}
          </Text>
        </Paragraph>

        <Row gutter={[16, 16]}>
          {/* Bộ lọc */}
          <Col xs={24} lg={6}>
            <Card title="Bộ lọc bác sĩ">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Input
                  placeholder="Tìm theo tên bác sĩ"
                  prefix={<FaSearch />}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
                <div>
                  <Text strong>Chuyên khoa:</Text>
                  <Select
                    placeholder="Chọn chuyên khoa"
                    style={{ width: "100%" }}
                    onChange={(value) => setSpecialtyFilter(value)}
                    allowClear
                  >
                    <Option value="NHAN_KHOA">Nhãn khoa</Option>
                    <Option value="PHAU_THUAT">Phẫu thuật</Option>
                    <Option value="KHUC_XA">Khúc xạ</Option>
                  </Select>
                </div>
                <div>
                  <Text strong>Giới tính:</Text>
                  <Radio.Group
                    onChange={(e) => setGenderFilter(e.target.value)}
                    value={genderFilter}
                  >
                    <Radio value="">Tất cả</Radio>
                    <Radio value="Nam">Nam</Radio>
                    <Radio value="Nữ">Nữ</Radio>
                  </Radio.Group>
                </div>
              </Space>
            </Card>
          </Col>

          {/* Danh sách bác sĩ */}
          <Col xs={24} lg={18}>
            <Spin spinning={isLoading} tip="Đang tải danh sách bác sĩ...">
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 2,
                  lg: 3,
                  xl: 3,
                }}
                dataSource={filteredDoctors}
                locale={{ emptyText: "Không tìm thấy bác sĩ nào." }}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      hoverable
                      actions={[
                        <Button
                          key={`book-appointment-${item.doctor_id}`}
                          type="primary"
                          style={{ width: "90%" }}
                          onClick={() => {
                            localStorage.setItem("doctor_id", item.doctor_id);
                            localStorage.setItem("doctor_name", item.full_name);
                            router.push(`${hospitalSlug}/${item.slug}`);
                          }}
                        >
                          Đặt lịch khám
                        </Button>,
                      ]}
                    >
                      <Card.Meta
                        avatar={<Avatar size={64} src={item.image} icon={<FaUser />} />}
                        title={
                          <Space>
                            <FaEye className="text-blue-500" />
                            {item.full_name}
                          </Space>
                        }
                        description={
                          <Space direction="vertical">
                            <Tag color="blue">{item.specialty}</Tag>
                            <Paragraph style={{ margin: 0 }}>
                              <Text strong>SĐT:</Text> {item.phone}
                            </Paragraph>
                            <Paragraph style={{ margin: 0 }}>
                              <Text strong>Email:</Text> {item.email}
                            </Paragraph>
                          </Space>
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </Spin>
          </Col>
        </Row>
      </div>
    </section>
  );
}
