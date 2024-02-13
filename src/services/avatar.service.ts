import { createAvatar } from '@dicebear/core';
import { personas } from '@dicebear/collection';

class AvatarService {

    public generateAvatar(seed: string) {
      const avatar = createAvatar(personas, {
          "seed": seed,
          "backgroundType": [
            "solid",
            "gradientLinear"
          ],
          "eyes": [
            "glasses",
            "happy",
            "wink",
            "sunglasses",
            "open"
          ],
          "mouth": [
            "bigSmile",
            "lips",
            "smile",
            "smirk"
          ],
          "backgroundColor": [
            "ffdfbf",
            "ffd5dc",
            "d1d4f9",
            "c0aede",
            "b6e3f4"
          ]
        });

        const svg = avatar.toString();
        return svg;
    }

}

export default new AvatarService();