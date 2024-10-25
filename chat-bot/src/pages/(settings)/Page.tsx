import React, { useState } from 'react';
import { Input, Button, Upload, Slider, Row, Col, Card } from 'antd';
import { UploadOutlined, RightOutlined } from '@ant-design/icons';

const SettingsPage = () => {
  const [openAiKey, setOpenAiKey] = useState('');
  const [pineconeKey, setPineconeKey] = useState('');
  const [pineconeEnv, setPineconeEnv] = useState('');
  const [pineconeIndex, setPineconeIndex] = useState('');
  const [chunkSize, setChunkSize] = useState(1200);
  const [overlapSize, setOverlapSize] = useState(20);

  return (
   <div className=' h-screen bg-gray-900'>
       <Row gutter={16} style={{ padding: '24px'}}>
      {/* bảng trái */}
      <Col span={12}>
        <Card title="OpenAI & Pinecone Settings" bordered={false}>
          <Input.Password
            placeholder="OpenAI API Key"
            value={openAiKey}
            onChange={(e) => setOpenAiKey(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <Input.Password
            placeholder="Pinecone API Key"
            value={pineconeKey}
            onChange={(e) => setPineconeKey(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <Input
            placeholder="Pinecone Environment"
            value={pineconeEnv}
            onChange={(e) => setPineconeEnv(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <Input
            placeholder="Pinecone Index Name"
            value={pineconeIndex}
            onChange={(e) => setPineconeIndex(e.target.value)}
            style={{ marginBottom: '16px' }}
          />

          <Button type="primary" icon={<RightOutlined />} block>
            Start Chatting
          </Button>
        </Card>
      </Col>

      {/* 
Bảng bên phải */}
      <Col span={12}>
        <Card title="Creating Namespaces" bordered={false}>
          <Upload.Dragger
            name="files"
            multiple
            action="/upload.do"
            style={{ marginBottom: '16px' }}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">
              Drag and drop or click to select files to upload
            </p>
          </Upload.Dragger>

          <Button type="primary" block style={{ marginBottom: '16px' }}>
            Upload files
          </Button>

          {/* Kích thước đoạn */}
          <div style={{ marginBottom: '16px' }}>
            <Row justify="space-between">
              <Col>Chunk size</Col>
              <Col>{chunkSize}</Col>
            </Row>
            <Slider
              min={500}
              max={2000}
              value={chunkSize}
              onChange={(value) => setChunkSize(value)}
            />
          </div>

          {/* Kích thước */}
          <div>
            <Row justify="space-between">
              <Col>Overlap size</Col>
              <Col>{overlapSize}%</Col>
            </Row>
            <Slider
              min={0}
              max={100}
              value={overlapSize}
              onChange={(value) => setOverlapSize(value)}
            />
          </div>
        </Card>
      </Col>
    </Row>
   </div>
  );
};

export default SettingsPage;
