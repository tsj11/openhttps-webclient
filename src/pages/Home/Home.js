import { Carousel } from 'antd';
import React, { PureComponent } from 'react';
import img1 from '@/assets/images/1.png';
import img2 from '@/assets/images/2.png';
import img3 from '@/assets/images/3.png';
import img4 from '@/assets/images/4.png';

const styles = {
  carousel: {
    margin: '0px auto',
    width: 892.5,
    height: 280,
  },
};

class Home extends PureComponent {

  componentWillMount() {
  }

  render() {
    return (
      <Carousel autoplay>
        <div>
          <img src={img1} alt="" style={styles.carousel} />
        </div>
        <div>
          <img src={img2} alt="" style={styles.carousel} />
        </div>
        <div>
          <img src={img3} alt="" style={styles.carousel} />
        </div>
        <div>
          <img src={img4} alt="" style={styles.carousel} />
        </div>
      </Carousel>
    );
  }
}

export default Home;
